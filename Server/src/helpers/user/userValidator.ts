import Joi from 'joi'

export const userValidator = Joi.object({
    fullName: Joi.string().required(),
    userName: Joi.string().required(),
    email: Joi.string().required().email(),
    location: Joi.string().required(),
    lat: Joi.number().required(),
    lng: Joi.number().required(),
    phoneNumber: Joi.number().required(),
    password: Joi.string().required(),
})