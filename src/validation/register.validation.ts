import { Joi } from "express-validation";

export const RegisterValidation = Joi.object({
    name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().required(),
    celuphone: Joi.string().required(),
    address: Joi.string().required(),
    password: Joi.string().required(),
    password_confirm: Joi.string().required(),
    person_type: Joi.string().required(),
    goal: Joi.string().required(),
    active: Joi.string().required(),
})