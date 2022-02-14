"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tx_type = void 0;
const typeorm_1 = require("typeorm");
const c_expenses_entity_1 = require("./c_expenses.entity");
let Tx_type = class Tx_type {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Tx_type.prototype, "id_tx_type", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Tx_type.prototype, "desc_tx_type", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Tx_type.prototype, "active", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => c_expenses_entity_1.C_expenses, expenses => expenses.tx_type),
    __metadata("design:type", Array)
], Tx_type.prototype, "tx_types", void 0);
Tx_type = __decorate([
    (0, typeorm_1.Entity)()
], Tx_type);
exports.Tx_type = Tx_type;
