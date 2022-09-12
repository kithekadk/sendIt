import Joi from "joi";

export const LoginValidator= Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8),
})