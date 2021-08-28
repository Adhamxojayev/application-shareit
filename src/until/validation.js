import Joi  from 'joi'

const registerValidation = Joi.object({
    username: Joi.string().required().min(5),
    password: Joi.string().min(8).required(),
    email: Joi.string().required(),
    age: Joi.number(),
    contact: Joi.number()
})




