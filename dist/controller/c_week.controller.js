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
exports.C_weeks = void 0;
const typeorm_1 = require("typeorm");
const c_week_entity_1 = require("../entity/c_week.entity");
const C_weeks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const repository = (0, typeorm_1.getManager)().getRepository(c_week_entity_1.C_week);
    res.send(yield repository.find());
});
exports.C_weeks = C_weeks;
