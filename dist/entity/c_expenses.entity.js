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
exports.C_expenses = void 0;
const typeorm_1 = require("typeorm");
const classification_entity_1 = require("./classification.entity");
const c_week_entity_1 = require("./c_week.entity");
const tx_type_entity_1 = require("./tx_type.entity");
const c_person_entity_1 = require("./c_person.entity");
let C_expenses = class C_expenses {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], C_expenses.prototype, "id_expenses", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => classification_entity_1.C_classification),
    (0, typeorm_1.JoinColumn)({ name: 'id_classification' }),
    __metadata("design:type", classification_entity_1.C_classification)
], C_expenses.prototype, "classification", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], C_expenses.prototype, "detail", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], C_expenses.prototype, "value", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => c_week_entity_1.C_week),
    (0, typeorm_1.JoinColumn)({ name: 'id_week' }),
    __metadata("design:type", c_week_entity_1.C_week)
], C_expenses.prototype, "week", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => c_person_entity_1.c_person),
    (0, typeorm_1.JoinColumn)({ name: 'id_person' }),
    __metadata("design:type", c_person_entity_1.c_person)
], C_expenses.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => tx_type_entity_1.Tx_type),
    (0, typeorm_1.JoinColumn)({ name: 'id_tx_type' }),
    __metadata("design:type", tx_type_entity_1.Tx_type)
], C_expenses.prototype, "tx_type", void 0);
C_expenses = __decorate([
    (0, typeorm_1.Entity)()
], C_expenses);
exports.C_expenses = C_expenses;
