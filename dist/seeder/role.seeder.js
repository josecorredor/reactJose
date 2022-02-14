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
const typeorm_1 = require("typeorm");
const permission_entity_1 = require("../entity/permission.entity");
const role_entity_1 = require("../entity/role.entity");
(0, typeorm_1.createConnection)().then((connection) => __awaiter(void 0, void 0, void 0, function* () {
    const permissionRepository = (0, typeorm_1.getManager)().getRepository(permission_entity_1.Permission);
    let permissions = [];
    const perms = ['view_users', 'edit_users', 'view_roles', 'edit_roles', 'view_products', 'edit_products', 'view_orders', 'edit_orders', 'view_expenses', 'edit_expenses'];
    for (let i = 0; i < perms.length; i++) {
        permissions.push(yield permissionRepository.save({
            name: perms[i]
        }));
    }
    const roleRepository = (0, typeorm_1.getManager)().getRepository(role_entity_1.Role);
    yield roleRepository.save({
        name: 'Admin',
        permissions
    });
    delete permissions[3];
    yield roleRepository.save({
        name: 'Editor',
        permissions
    });
    delete permissions[1];
    delete permissions[5];
    delete permissions[7];
    yield roleRepository.save({
        name: 'Viewer',
        permissions
    });
    process.exit(0);
}));
