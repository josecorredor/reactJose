"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChartIncomesPaola = exports.ChartIncomesJose = exports.ChartKindExp1 = exports.ChartKindExp = exports.ChartExpDet = exports.ChartDebts = exports.ChartBank = exports.ChartOutcomesW = exports.ChartIncomesW = exports.ChartInitialDebt = exports.ChartCurrentDebt = exports.ChartWeek = exports.ChartStateDebt = exports.ChartSavingsR = exports.ChartSavings = exports.Chart = exports.Export = exports.Orders = void 0;
const json2csv_1 = require("json2csv");
const typeorm_1 = require("typeorm");
const order_entity_1 = require("../entity/order.entity");
const Orders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const take = 15;
    const page = parseInt(req.query.page || '1');
    const repository = (0, typeorm_1.getManager)().getRepository(order_entity_1.Order);
    const [data, total] = yield repository.findAndCount({
        take,
        skip: (page - 1) * take,
        relations: ['order_items']
    });
    res.send({
        data: data.map((order) => ({
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
});
exports.Orders = Orders;
const Export = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parser = new json2csv_1.Parser({
        fields: ['ID', 'Name', 'Email', 'Product Title', 'Price', 'Quantity']
    });
    const repository = (0, typeorm_1.getManager)().getRepository(order_entity_1.Order);
    const orders = yield repository.find({ relations: ['order_items'] });
    const json = [];
    orders.forEach((order) => {
        json.push({
            ID: order.id,
            Name: order.name,
            Email: order.email,
            'Product Title': '',
            Price: '',
            Quantity: ''
        });
        order.order_items.forEach((item) => {
            json.push({
                ID: '',
                Name: '',
                Email: '',
                'Product Title': item.product_title,
                Price: item.price,
                Quantity: item.quantity
            });
        });
    });
    const csv = parser.parse(json);
    res.header('Content-Type', 'text/csv');
    res.attachment('orders.csv');
    res.send(csv);
});
exports.Export = Export;
const Chart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const manager = (0, typeorm_1.getManager)();
    const result = yield manager.query(`SELECT DATE_FORMAT(o.created_at, '%Y-%m-%d') as date, SUM(oi.price * oi.quantity) as sum 
        FROM \`order\`as o INNER JOIN \`order_item\`as oi ON o.id = oi.id 
        GROUP BY date`);
    res.send(result);
});
exports.Chart = Chart;
const ChartSavings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const manager = (0, typeorm_1.getManager)();
    const result = yield manager.query(`SELECT detail as Item, SUM(value * -1) as Total 
        FROM \`c_expenses\` WHERE \`id_tx_type\` = 1 AND \`id_classification\`=30
        GROUP BY detail`);
    res.send(result);
});
exports.ChartSavings = ChartSavings;
const ChartSavingsR = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const manager = (0, typeorm_1.getManager)();
    const result = yield manager.query(`SELECT detail as Item, SUM(value) as Total 
        FROM \`c_expenses\` WHERE \`id_tx_type\` = 1 AND \`id_classification\`=31
        GROUP BY detail`);
    res.send(result);
});
exports.ChartSavingsR = ChartSavingsR;
const ChartStateDebt = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const manager = (0, typeorm_1.getManager)();
    const result = yield manager.query(`SELECT a.detail, 
        (SELECT SUM(b.value) FROM c_expenses as b WHERE b.detail = a.detail AND (b.id_classification = 22 OR b.id_classification = 19)) as curDebt, 
        (SELECT SUM(c.value) * -1 FROM c_expenses as c WHERE c.detail = a.detail AND c.id_classification = 19) as payment, 
        (SELECT SUM(d.value) FROM c_expenses as d WHERE d.detail = a.detail AND d.id_classification = 22) as debt 
        FROM c_expenses as a 
        WHERE a.id_classification= 22 OR a.id_classification = 19 
        GROUP BY a.detail`);
    res.send(result);
});
exports.ChartStateDebt = ChartStateDebt;
const ChartWeek = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const manager = (0, typeorm_1.getManager)();
    const result = yield manager.query(`SELECT c.name, c.date_s, c.date_f, c.month, c.year
        FROM c_expenses as a
        INNER JOIN c_week as c ON c.id_week = a.id_week
        WHERE a.id_tx_type =1 AND a.id_week= (SELECT max(b.id_week) FROM c_expenses as b)
        GROUP BY c.name, c.date_s, c.date_f, c.month, c.year`);
    res.send(result);
});
exports.ChartWeek = ChartWeek;
const ChartCurrentDebt = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const manager = (0, typeorm_1.getManager)();
    const result = yield manager.query(`SELECT FORMAT(SUM(value),0) as curDeb FROM \`c_expenses\` WHERE \`id_classification\`= 22 OR \`id_classification\` = 19`);
    res.send(result);
});
exports.ChartCurrentDebt = ChartCurrentDebt;
const ChartInitialDebt = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const manager = (0, typeorm_1.getManager)();
    const result = yield manager.query(`SELECT FORMAT(SUM(value),0) as iniDeb FROM \`c_expenses\` WHERE \`id_classification\`= 22`);
    res.send(result);
});
exports.ChartInitialDebt = ChartInitialDebt;
const ChartIncomesW = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const manager = (0, typeorm_1.getManager)();
    const result = yield manager.query(`SELECT FORMAT(SUM(value),0) as incomesw FROM c_expenses WHERE \`id_tx_type\` =2 AND \`id_week\`= (SELECT max(\`id_week\`) FROM \`c_expenses\`)`);
    res.send(result);
});
exports.ChartIncomesW = ChartIncomesW;
const ChartOutcomesW = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const manager = (0, typeorm_1.getManager)();
    const result = yield manager.query(`SELECT FORMAT(SUM(value),0) as expensesw FROM c_expenses WHERE \`id_tx_type\` =1 AND \`id_week\`= (SELECT max(\`id_week\`) FROM \`c_expenses\`) AND \`id_classification\` != 28 AND \`id_classification\` != 29 AND \`id_classification\` !=31`);
    res.send(result);
});
exports.ChartOutcomesW = ChartOutcomesW;
const ChartBank = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const manager = (0, typeorm_1.getManager)();
    const result = yield manager.query(`SELECT FORMAT(last_value,0) as ant, FORMAT(value,0) as cur FROM \`c_bank_account\``);
    res.send(result);
});
exports.ChartBank = ChartBank;
const ChartDebts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const manager = (0, typeorm_1.getManager)();
    const result = yield manager.query(`SELECT c.TYPE_E,
        SUM(a.value) as expensesg 
        FROM c_expenses as a
        INNER JOIN c_classification as c ON c.id_classification = a.id_classification
        WHERE a.id_tx_type =1 AND a.id_week= (SELECT max(b.id_week) FROM c_expenses as b) AND a.id_classification != 28 AND a.id_classification != 29 AND a.id_classification !=31 GROUP BY c.TYPE_E`);
    res.send(result);
});
exports.ChartDebts = ChartDebts;
const ChartExpDet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const manager = (0, typeorm_1.getManager)();
    const result = yield manager.query(`SELECT c.name, 
        FORMAT(SUM(a.value),0) as expensesw 
        FROM c_expenses as a
        INNER JOIN c_classification as c ON c.id_classification = a.id_classification
        WHERE a.id_tx_type =1 AND a.id_week= (SELECT max(b.id_week) FROM c_expenses as b) AND a.id_classification != 28 AND a.id_classification != 29 AND a.id_classification !=31 GROUP BY c.name`);
    res.send(result);
});
exports.ChartExpDet = ChartExpDet;
const ChartKindExp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const manager = (0, typeorm_1.getManager)();
    const result = yield manager.query(`SELECT b.name, b.date_s, SUM(a.value) as valexp
        FROM c_expenses as a 
        INNER JOIN c_week as b ON b.id_week = a.id_week
        WHERE b.year = (SELECT max(c.year) FROM c_week as c) AND a.id_tx_type = 2 AND (id_person =1 OR id_person = 2)
        GROUP BY a.id_week
        LIMIT 5`);
    res.send(result);
});
exports.ChartKindExp = ChartKindExp;
const ChartKindExp1 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const manager = (0, typeorm_1.getManager)();
    const result = yield manager.query(`SELECT b.name, b.date_s, SUM(ABS(a.value)) as valexp
        FROM c_expenses as a 
        INNER JOIN c_week as b ON b.id_week = a.id_week
        WHERE b.year = (SELECT max(c.year) FROM c_week as c) AND a.id_tx_type = 1 AND a.id_classification != 28 AND a.id_classification != 29 AND a.id_classification != 31
        GROUP BY a.id_week
        LIMIT 5`);
    res.send(result);
});
exports.ChartKindExp1 = ChartKindExp1;
const ChartIncomesJose = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const manager = (0, typeorm_1.getManager)();
    const result = yield manager.query(`SELECT b.name, b.date_s, SUM(a.value) as valexp
        FROM c_expenses as a 
        INNER JOIN c_week as b ON b.id_week = a.id_week
        WHERE b.year = (SELECT max(c.year) FROM c_week as c) AND a.id_tx_type = 2 AND id_person =1
        GROUP BY a.id_week
        LIMIT 5`);
    res.send(result);
});
exports.ChartIncomesJose = ChartIncomesJose;
const ChartIncomesPaola = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const manager = (0, typeorm_1.getManager)();
    const result = yield manager.query(`SELECT b.name, b.date_s, SUM(a.value) as valexp
        FROM c_expenses as a 
        INNER JOIN c_week as b ON b.id_week = a.id_week
        WHERE b.year = (SELECT max(c.year) FROM c_week as c) AND a.id_tx_type = 2 AND id_person =2
        GROUP BY a.id_week
        LIMIT 5`);
    res.send(result);
});
exports.ChartIncomesPaola = ChartIncomesPaola;
