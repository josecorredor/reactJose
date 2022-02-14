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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteExpense = exports.UpdateExpense = exports.GetExpense = exports.CreateExpense = exports.Expenses = void 0;
const typeorm_1 = require("typeorm");
const c_expenses_entity_1 = require("../entity/c_expenses.entity");
const Expenses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const take = 15;
    const page = parseInt(req.query.page || '1');
    const repository = (0, typeorm_1.getManager)().getRepository(c_expenses_entity_1.C_expenses);
    const [data, total] = yield repository.findAndCount({
        take,
        skip: (page - 1) * take,
        relations: ['classification', 'week', 'user', 'tx_type']
    });
    res.send({
        data: data.map((expenses) => ({
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
});
exports.Expenses = Expenses;
const CreateExpense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.body, { id_week, id_classification, id_person, id_tx_type } = _a, body = __rest(_a, ["id_week", "id_classification", "id_person", "id_tx_type"]);
    const repository = (0, typeorm_1.getManager)().getRepository(c_expenses_entity_1.C_expenses);
    const expense = yield repository.save(Object.assign(Object.assign({}, body), { week: {
            id_week: id_week
        }, classification: {
            id_classification: id_classification
        }, user: {
            id_person: id_person
        }, tx_type: {
            id_tx_type: id_tx_type
        } }));
    res.status(201).send(expense);
});
exports.CreateExpense = CreateExpense;
const GetExpense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const repository = (0, typeorm_1.getManager)().getRepository(c_expenses_entity_1.C_expenses);
    res.send(yield repository.findOne(req.params.id_expenses, { relations: ['classification', 'week', 'user', 'tx_type'] }));
});
exports.GetExpense = GetExpense;
const UpdateExpense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _b = req.body, { id_week, id_classification, id_person, id_tx_type } = _b, body = __rest(_b, ["id_week", "id_classification", "id_person", "id_tx_type"]);
    const repository = (0, typeorm_1.getManager)().getRepository(c_expenses_entity_1.C_expenses);
    yield repository.update(req.params.id_expenses, Object.assign(Object.assign({}, body), { week: {
            id_week: id_week
        }, classification: {
            id_classification: id_classification
        }, user: {
            id_person: id_person
        }, tx_type: {
            id_tx_type: id_tx_type
        } }));
    res.status(202).send(yield repository.findOne(req.params.id_expenses, { relations: ['classification', 'week', 'user', 'tx_type'] }));
});
exports.UpdateExpense = UpdateExpense;
const DeleteExpense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const repository = (0, typeorm_1.getManager)().getRepository(c_expenses_entity_1.C_expenses);
    yield repository.delete(req.params.id_expenses);
    res.status(204).send(null);
});
exports.DeleteExpense = DeleteExpense;
