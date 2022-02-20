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
exports.UpdatePassword = exports.UpdateInfo = exports.Logout = exports.AuthenticatedUser = exports.Login = exports.Register = void 0;
const typeorm_1 = require("typeorm");
const c_person_entity_1 = require("../entity/c_person.entity");
const register_validation_1 = require("../validation/register.validation");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = require("jsonwebtoken");
const Register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const { error } = register_validation_1.RegisterValidation.validate(body);
    if (error) {
        return res.status(400).send(error.details);
    }
    if (body.password !== body.password_confirm) {
        return res.status(400).send({
            message: "Password's do not match"
        });
    }
    const repository = (0, typeorm_1.getManager)().getRepository(c_person_entity_1.c_person);
    const _a = yield repository.save({
        name: body.name,
        last_name: body.last_name,
        email: body.email,
        celuphone: body.celuphone,
        address: body.address,
        password: yield bcryptjs_1.default.hash(body.password, 10),
        person_type: body.person_type,
        goal: body.goal,
        active: body.active,
    }), { password } = _a, c_person1 = __rest(_a, ["password"]);
    res.send(c_person1);
});
exports.Register = Register;
const Login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const repository = (0, typeorm_1.getManager)().getRepository(c_person_entity_1.c_person);
    const C_person = yield repository.findOne({ email: req.body.email });
    if (!C_person) {
        return res.status(404).send({
            message: 'User no found'
        });
    }
    if (!(yield bcryptjs_1.default.compare(req.body.password, C_person.password))) {
        return res.status(400).send({
            message: 'Invalid credentials'
        });
    }
    const token = (0, jsonwebtoken_1.sign)({ id: C_person.id_person }, process.env.SECRET_KEY);
    res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 //1 day
    });
    //const {password, ...data}= C_person;
    res.send({
        message: 'success'
    });
});
exports.Login = Login;
const AuthenticatedUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _b = req["user"], { password } = _b, user = __rest(_b, ["password"]);
    res.send(user);
});
exports.AuthenticatedUser = AuthenticatedUser;
const Logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.cookie('jwt', '', { maxAge: 0 });
    res.send({
        message: 'success'
    });
});
exports.Logout = Logout;
const UpdateInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req["user"];
    const repository = (0, typeorm_1.getManager)().getRepository(c_person_entity_1.c_person);
    yield repository.update(user.id_person, req.body);
    const _c = yield repository.findOne(user.id_person), { password } = _c, data = __rest(_c, ["password"]);
    res.send(data);
});
exports.UpdateInfo = UpdateInfo;
const UpdatePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req["user"];
    if (req.body.password !== req.body.password_confirm) {
        return res.status(400).send({
            message: "Password's do not match"
        });
    }
    const repository = (0, typeorm_1.getManager)().getRepository(c_person_entity_1.c_person);
    yield repository.update(user.id_person, {
        password: yield bcryptjs_1.default.hash(req.body.password, 10)
    });
    const { password } = user, data = __rest(user, ["password"]);
    res.send(data);
});
exports.UpdatePassword = UpdatePassword;
