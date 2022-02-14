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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteUser = exports.UpdateUser = exports.GetUser = exports.CreateUser = exports.Users = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../entity/user.entity");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const Users = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const take = 15;
    const page = parseInt(req.query.page || '1');
    const repository = (0, typeorm_1.getManager)().getRepository(user_entity_1.c_person);
    const [data, total] = yield repository.findAndCount({
        take,
        skip: (page - 1) * take,
        relations: ['role']
    });
    res.send({
        data: data.map(u => {
            const { password } = u, data = __rest(u, ["password"]);
            return data;
        }),
        meta: {
            total,
            page,
            last_page: Math.ceil(total / take)
        }
    });
});
exports.Users = Users;
const CreateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.body, { id_role } = _a, body = __rest(_a, ["id_role"]);
    const hashedPassword = yield bcryptjs_1.default.hash('1234', 10);
    const repository = (0, typeorm_1.getManager)().getRepository(user_entity_1.c_person);
    const _b = yield repository.save(Object.assign(Object.assign({}, body), { password: hashedPassword, role: {
            id_role: id_role
        } })), { password } = _b, user = __rest(_b, ["password"]);
    res.status(201).send(user);
});
exports.CreateUser = CreateUser;
const GetUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const repository = (0, typeorm_1.getManager)().getRepository(user_entity_1.c_person);
    const _c = yield repository.findOne(req.params.id_person, { relations: ['role'] }), { password } = _c, user = __rest(_c, ["password"]);
    res.send(user);
});
exports.GetUser = GetUser;
const UpdateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _d = req.body, { id_role } = _d, body = __rest(_d, ["id_role"]);
    const repository = (0, typeorm_1.getManager)().getRepository(user_entity_1.c_person);
    yield repository.update(req.params.id_person, Object.assign(Object.assign({}, body), { role: {
            id_role: id_role
        } }));
    const _e = yield repository.findOne(req.params.id_person, { relations: ['role'] }), { password } = _e, user = __rest(_e, ["password"]);
    res.status(202).send(user);
});
exports.UpdateUser = UpdateUser;
const DeleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const repository = (0, typeorm_1.getManager)().getRepository(user_entity_1.c_person);
    yield repository.delete(req.params.id_person);
    res.status(204).send(null);
});
exports.DeleteUser = DeleteUser;
