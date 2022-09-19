import Joi from 'joi'

export const parcelValidator = Joi.object({
    sender: Joi.string().required(),
    parcelWeight: Joi.number().required(),
    price: Joi.number().required(),
    lat: Joi.number().required(),
    lng: Joi.number().required(),
    senderLat: Joi.number().required(),
    senderLng: Joi.number().required(),
    parcelDescription: Joi.string().required(),
    receiverLocation: Joi.string().required(),
    receiverPhone: Joi.string().required(),
    receiverEmail: Joi.string().required(),
    deliveryDate: Joi.string().required(),
})