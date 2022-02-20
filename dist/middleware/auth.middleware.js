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
exports.AuthMiddleware = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const typeorm_1 = require("typeorm");
const c_person_entity_1 = require("../entity/c_person.entity");
const AuthMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jwt = req.cookies['jwt'];
        const payload = (0, jsonwebtoken_1.verify)(jwt, process.env.SECRET_KEY);
        if (!payload) {
            return res.status(401).send({
                message: 'unautenticated'
            });
        }
        const repository = (0, typeorm_1.getManager)().getRepository(c_person_entity_1.c_person);
        req["user"] = yield repository.findOne(payload.id_person, { relations: ['role', 'role.permissions'] });
        next();
    }
    catch (e) {
        return res.status(401).send({
            message: 'unauthenticated'
        });
    }
});
exports.AuthMiddleware = AuthMiddleware;
