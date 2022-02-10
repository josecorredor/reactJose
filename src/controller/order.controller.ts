import { Request, Response } from "express"
import { Parser } from "json2csv";
import { getManager } from "typeorm";
import { OrderItem } from "../entity/order-item-entity";
import { Order } from "../entity/order.entity";

export const Orders = async (req: Request, res: Response) => {
    const take = 15;
    const page = parseInt(req.query.page as string || '1');
    const repository = getManager().getRepository(Order);

    const [data, total] = await repository.findAndCount({
        take,
        skip: (page-1) * take,
        relations: ['order_items']
    });


    res.send({
        data: data.map((order: Order) => ({
            id: order.id,
            name: order.name,
            email: order.email,
            total: order.total,
            created_at: order.created_at,
            order_items: order.order_items
        })),
        meta: {
            total,
            page,
            last_page: Math.ceil(total / take)
        }
    });
}

export const Export = async (req:Request, res: Response) => {
    const parser = new Parser({
        fields: ['ID', 'Name', 'Email', 'Product Title', 'Price', 'Quantity']
    })

    const repository = getManager().getRepository(Order);
    const orders = await repository.find({relations:['order_items']});

    const json = [];

    orders.forEach((order: Order) => {
       json.push({
           ID: order.id,
           Name: order.name,
           Email: order.email,
           'Product Title': '',
           Price: '',
           Quantity: ''
       });
       
       order.order_items.forEach((item: OrderItem) => {
            json.push({
                ID: '',
                Name: '',
                Email: '',
                'Product Title': item.product_title,
                Price: item.price,
                Quantity: item.quantity
            })
        })

    });
    const csv = parser.parse(json);
    res.header('Content-Type', 'text/csv');
    res.attachment('orders.csv');
    res.send(csv);
}

export const Chart = async (req: Request, res: Response) =>{
    const manager = getManager();

    const result = await manager.query(
        `SELECT DATE_FORMAT(o.created_at, '%Y-%m-%d') as date, SUM(oi.price * oi.quantity) as sum 
        FROM \`order\`as o INNER JOIN \`order_item\`as oi ON o.id = oi.id 
        GROUP BY date`
    );
    res.send(result);
    
}

export const ChartSavings = async (req: Request, res: Response) =>{
    const manager = getManager();

    const result = await manager.query(
        `SELECT detail as Item, SUM(value * -1) as Total 
        FROM \`c_expenses\` WHERE \`id_tx_type\` = 1 AND \`id_classification\`=30
        GROUP BY detail`
    );
    res.send(result);
    
}

export const ChartSavingsR = async (req: Request, res: Response) =>{
    const manager = getManager();

    const result = await manager.query(
        `SELECT detail as Item, SUM(value) as Total 
        FROM \`c_expenses\` WHERE \`id_tx_type\` = 1 AND \`id_classification\`=31
        GROUP BY detail`
    );
    res.send(result);
    
}
export const ChartStateDebt = async (req: Request, res: Response) =>{
    const manager = getManager();

    const result = await manager.query(
        `SELECT a.detail, 
        (SELECT SUM(b.value) FROM c_expenses as b WHERE b.detail = a.detail AND (b.id_classification = 22 OR b.id_classification = 19)) as curDebt, 
        (SELECT SUM(c.value) * -1 FROM c_expenses as c WHERE c.detail = a.detail AND c.id_classification = 19) as payment, 
        (SELECT SUM(d.value) FROM c_expenses as d WHERE d.detail = a.detail AND d.id_classification = 22) as debt 
        FROM c_expenses as a 
        WHERE a.id_classification= 22 OR a.id_classification = 19 
        GROUP BY a.detail`
    );
    res.send(result);
    
}
export const ChartWeek = async (req: Request, res: Response) =>{
    const manager = getManager();

    const result = await manager.query(
        `SELECT c.name, c.date_s, c.date_f, c.month, c.year
        FROM c_expenses as a
        INNER JOIN c_week as c ON c.id_week = a.id_week
        WHERE a.id_tx_type =1 AND a.id_week= (SELECT max(b.id_week) FROM c_expenses as b)
        GROUP BY c.name, c.date_s, c.date_f, c.month, c.year`
    );
    res.send(result);
    
}
export const ChartCurrentDebt = async (req: Request, res: Response) =>{
    const manager = getManager();

    const result = await manager.query(
        `SELECT FORMAT(SUM(value),0) as curDeb FROM \`c_expenses\` WHERE \`id_classification\`= 22 OR \`id_classification\` = 19`
    );
    res.send(result);
    
}
export const ChartInitialDebt = async (req: Request, res: Response) =>{
    const manager = getManager();

    const result = await manager.query(
        `SELECT FORMAT(SUM(value),0) as iniDeb FROM \`c_expenses\` WHERE \`id_classification\`= 22`
    );
    res.send(result);
    
}
export const ChartIncomesW = async (req: Request, res: Response) =>{
    const manager = getManager();

    const result = await manager.query(
        `SELECT FORMAT(SUM(value),0) as incomesw FROM c_expenses WHERE \`id_tx_type\` =2 AND \`id_week\`= (SELECT max(\`id_week\`) FROM \`c_expenses\`)`
    );
    res.send(result);
    
}
export const ChartOutcomesW = async (req: Request, res: Response) =>{
    const manager = getManager();

    const result = await manager.query(
        `SELECT FORMAT(SUM(value),0) as expensesw FROM c_expenses WHERE \`id_tx_type\` =1 AND \`id_week\`= (SELECT max(\`id_week\`) FROM \`c_expenses\`) AND \`id_classification\` != 28 AND \`id_classification\` != 29 AND \`id_classification\` !=31`
    );
    res.send(result);
    
}
export const ChartBank = async (req: Request, res: Response) =>{
    const manager = getManager();

    const result = await manager.query(
        `SELECT FORMAT(last_value,0) as ant, FORMAT(value,0) as cur FROM \`c_bank_account\``
    );
    res.send(result);
    
}
export const ChartDebts = async (req: Request, res: Response) =>{
    const manager = getManager();

    const result = await manager.query(
        `SELECT c.TYPE_E,
        SUM(a.value) as expensesg 
        FROM c_expenses as a
        INNER JOIN c_classification as c ON c.id_classification = a.id_classification
        WHERE a.id_tx_type =1 AND a.id_week= (SELECT max(b.id_week) FROM c_expenses as b) AND a.id_classification != 28 AND a.id_classification != 29 AND a.id_classification !=31 GROUP BY c.TYPE_E`
    );
    res.send(result);
    
}
export const ChartExpDet = async (req: Request, res: Response) =>{
    const manager = getManager();

    const result = await manager.query(
        `SELECT c.name, 
        FORMAT(SUM(a.value),0) as expensesw 
        FROM c_expenses as a
        INNER JOIN c_classification as c ON c.id_classification = a.id_classification
        WHERE a.id_tx_type =1 AND a.id_week= (SELECT max(b.id_week) FROM c_expenses as b) AND a.id_classification != 28 AND a.id_classification != 29 AND a.id_classification !=31 GROUP BY c.name`
    );
    res.send(result);
    
}
export const ChartKindExp = async (req: Request, res: Response) =>{
    const manager = getManager();

    const result = await manager.query(
        `SELECT b.name, b.date_s, SUM(a.value) as valexp
        FROM c_expenses as a 
        INNER JOIN c_week as b ON b.id_week = a.id_week
        WHERE b.year = (SELECT max(c.year) FROM c_week as c) AND a.id_tx_type = 2 AND (id_person =1 OR id_person = 2)
        GROUP BY a.id_week
        LIMIT 5`
    );
    res.send(result);
    
}

export const ChartKindExp1 = async (req: Request, res: Response) =>{
    const manager = getManager();

    const result = await manager.query(
        `SELECT b.name, b.date_s, SUM(ABS(a.value)) as valexp
        FROM c_expenses as a 
        INNER JOIN c_week as b ON b.id_week = a.id_week
        WHERE b.year = (SELECT max(c.year) FROM c_week as c) AND a.id_tx_type = 1 AND a.id_classification != 28 AND a.id_classification != 29 AND a.id_classification != 31
        GROUP BY a.id_week
        LIMIT 5`
    );
    res.send(result);
    
}

export const ChartIncomesJose = async (req: Request, res: Response) =>{
    const manager = getManager();

    const result = await manager.query(
        `SELECT b.name, b.date_s, SUM(a.value) as valexp
        FROM c_expenses as a 
        INNER JOIN c_week as b ON b.id_week = a.id_week
        WHERE b.year = (SELECT max(c.year) FROM c_week as c) AND a.id_tx_type = 2 AND id_person =1
        GROUP BY a.id_week
        LIMIT 5`
    );
    res.send(result);
    
}

export const ChartIncomesPaola = async (req: Request, res: Response) =>{
    const manager = getManager();

    const result = await manager.query(
        `SELECT b.name, b.date_s, SUM(a.value) as valexp
        FROM c_expenses as a 
        INNER JOIN c_week as b ON b.id_week = a.id_week
        WHERE b.year = (SELECT max(c.year) FROM c_week as c) AND a.id_tx_type = 2 AND id_person =2
        GROUP BY a.id_week
        LIMIT 5`
    );
    res.send(result);
    
}