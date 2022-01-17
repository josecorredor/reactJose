import { Request, Response } from "express"
import { getManager, getRepository } from "typeorm"
import { c_person } from "../entity/user.entity"
import bcryptjs from "bcryptjs"
import { send } from "process"

export const Users = async (req: Request, res: Response) => {
    const take = 15;
    const page = parseInt(req.query.page as string || '1');

    const repository = getManager().getRepository(c_person);

    const [data, total] = await repository.findAndCount({
        take,
        skip: (page-1) * take,
        relations: ['role']
    });

    res.send({
        data: data.map(u => {
            const {password, ...data} =u;
    
            return data;
        }),
        meta: {
            total,
            page,
            last_page: Math.ceil(total / take)
        }
    });
}

export const CreateUser = async (req: Request, res: Response) => {
    const {id_role, ...body} = req.body;
    const hashedPassword = await bcryptjs.hash('1234',10);

    const repository = getManager().getRepository(c_person);

    const {password, ...user} = await repository.save({
        ...body,
        password: hashedPassword,
        role: {
            id_role: id_role
        }
    }); 

    res.status(201).send(user);
}

export const GetUser = async (req: Request, res: Response) => {
    const repository = getManager().getRepository(c_person);

    const {password, ...user} = await repository.findOne(req.params.id_person, {relations: ['role']})

    res.send(user);
}

export const UpdateUser = async (req: Request, res: Response) => {

    const {id_role, ...body} = req.body;
    const repository = getManager().getRepository(c_person);

    await repository.update(req.params.id_person, {
        ...body,
        role: {
            id_role: id_role
        }
    });

    const {password, ...user} = await repository.findOne(req.params.id_person, {relations:['role']})

    res.status(202).send(user);
}

export const DeleteUser = async (req: Request, res: Response) => {
    const repository = getManager().getRepository(c_person);

    await repository.delete(req.params.id_person);

    res.status(204).send(null);
}