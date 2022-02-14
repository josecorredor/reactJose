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
exports.DeleteRole = exports.UpdateRole = exports.GetRole = exports.CreateRole = exports.Roles = void 0;
const typeorm_1 = require("typeorm");
const role_entity_1 = require("../entity/role.entity");
const Roles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const repository = (0, typeorm_1.getManager)().getRepository(role_entity_1.Role);
    res.send(yield repository.find());
});
exports.Roles = Roles;
const CreateRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, permissions } = req.body;
    const repository = (0, typeorm_1.getManager)().getRepository(role_entity_1.Role);
    const role = yield repository.save({
        name,
        permissions: permissions.map((id_permission) => ({ id_permission }))
    });
    res.status(201).send(role);
});
exports.CreateRole = CreateRole;
const GetRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const repository = (0, typeorm_1.getManager)().getRepository(role_entity_1.Role);
    res.send(yield repository.findOne(req.params.id_role, { relations: ['permissions'] }));
});
exports.GetRole = GetRole;
const UpdateRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, permissions } = req.body;
    const repository = (0, typeorm_1.getManager)().getRepository(role_entity_1.Role);
    const role = yield repository.save({
        id_role: parseInt(req.params.id_role),
        name,
        permissions: permissions.map((id_permission) => ({ id_permission }))
    });
    res.status(202).send(role);
});
exports.UpdateRole = UpdateRole;
const DeleteRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const repository = (0, typeorm_1.getManager)().getRepository(role_entity_1.Role);
    yield repository.delete(req.params.id_role);
    res.status(204).send(null);
});
exports.DeleteRole = DeleteRole;
