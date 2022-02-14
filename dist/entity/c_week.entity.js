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
exports.C_week = void 0;
const typeorm_1 = require("typeorm");
const c_expenses_entity_1 = require("./c_expenses.entity");
let C_week = class C_week {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], C_week.prototype, "id_week", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], C_week.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], C_week.prototype, "date_s", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], C_week.prototype, "date_f", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], C_week.prototype, "month", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], C_week.prototype, "year", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => c_expenses_entity_1.C_expenses, expenses => expenses.week),
    __metadata("design:type", Array)
], C_week.prototype, "weeks", void 0);
C_week = __decorate([
    (0, typeorm_1.Entity)()
], C_week);
exports.C_week = C_week;
