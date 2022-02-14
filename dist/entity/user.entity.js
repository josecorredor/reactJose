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
exports.c_person = void 0;
const typeorm_1 = require("typeorm");
const role_entity_1 = require("./role.entity");
let c_person = class c_person {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], c_person.prototype, "id_person", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], c_person.prototype, "celuphone", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], c_person.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], c_person.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], c_person.prototype, "person_type", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], c_person.prototype, "goal", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], c_person.prototype, "active", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], c_person.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], c_person.prototype, "last_name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        unique: true
    }),
    __metadata("design:type", String)
], c_person.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => role_entity_1.Role),
    (0, typeorm_1.JoinColumn)({ name: 'id_role' }),
    __metadata("design:type", role_entity_1.Role)
], c_person.prototype, "role", void 0);
c_person = __decorate([
    (0, typeorm_1.Entity)()
], c_person);
exports.c_person = c_person;
