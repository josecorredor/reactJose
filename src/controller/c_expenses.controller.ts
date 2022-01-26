import { Request, Response } from "express"
import { getManager, getRepository } from "typeorm"
import { C_expenses } from "../entity/c_expenses.entity"

export const Expenses = async (req: Request, res: Response) => {
    const take = 15;
    const page = parseInt(req.query.page as string || '1');
    const repository = getManager().getRepository(C_expenses);

    const [data, total] = await repository.findAndCount({
        take,
        skip: (page-1) * take,
        relations: ['classification', 'week', 'user', 'tx_type']
    });

    res.send({
        data: data.map((expenses: C_expenses) => ({
            id_expenses: expenses.id_expenses,
            detail: expenses.detail,
            value: expenses.value,
            classification: expenses.classification,
            week: expenses.week,
            user: expenses.user,
            tx_type: expenses.tx_type
        })),
        meta: {
            total,
            page,
            last_page: Math.ceil(total / take)
        }
    });
}

export const CreateExpense = async (req: Request, res: Response) => {
    const {id_week, id_classification, id_person,  id_tx_type, ...body} = req.body;

    const repository = getManager().getRepository(C_expenses);

    const expense = await repository.save({
        ...body,
        week: {
            id_week: id_week
        },
        classification: {
            id_classification: id_classification
        },
        user: {
            id_person: id_person
        },
        tx_type: {
            id_tx_type: id_tx_type
        },
    }); 

    res.status(201).send(expense);
}


export const GetExpense = async (req: Request, res: Response) => {
    const repository = getManager().getRepository(C_expenses);

    res.send(await repository.findOne(req.params.id_expenses, {relations: ['classification', 'week', 'user', 'tx_type']}));
}

export const UpdateExpense = async (req: Request, res: Response) => {
    const {id_week, id_classification, id_person,  id_tx_type, ...body} = req.body;
    const repository = getManager().getRepository(C_expenses);

    await repository.update(req.params.id_expenses, {
            ...body,
            week: {
                id_week: id_week
            },
            classification: {
                id_classification: id_classification
            },
            user: {
                id_person: id_person
            },
            tx_type: {
                id_tx_type: id_tx_type
            },
    });

    res.status(202).send(await repository.findOne(req.params.id_expenses, {relations: ['classification', 'week', 'user', 'tx_type']}));
}

export const DeleteExpense = async (req: Request, res: Response) => {
    const repository = getManager().getRepository(C_expenses);

    await repository.delete(req.params.id_expenses);

    res.status(204).send(null);
}