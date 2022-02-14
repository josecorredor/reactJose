"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterValidation = void 0;
const express_validation_1 = require("express-validation");
exports.RegisterValidation = express_validation_1.Joi.object({
    name: express_validation_1.Joi.string().required(),
    last_name: express_validation_1.Joi.string().required(),
    email: express_validation_1.Joi.string().email().required(),
    celuphone: express_validation_1.Joi.string().required(),
    address: express_validation_1.Joi.string().required(),
    password: express_validation_1.Joi.string().required(),
    password_confirm: express_validation_1.Joi.string().required(),
    person_type: express_validation_1.Joi.string().required(),
    goal: express_validation_1.Joi.string().required(),
    active: express_validation_1.Joi.string().required(),
});
