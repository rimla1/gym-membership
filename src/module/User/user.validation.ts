import Joi from 'joi'

export const createUserInputValidationSchema = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

    age: Joi.number()
        .integer()
        .min(10)
        .max(120),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    gender: Joi.string()
        .alphanum()
        .min(3)
        .max(7)
        .required(),
})

export const editUserValidationInput = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

    age: Joi.number()
        .integer()
        .min(10)
        .max(120),

    gender: Joi.string()
        .alphanum()
        .min(3)
        .max(7),
})

// DRY (Try to finda solution if is it possible to not repeat similar code 2 times, instead try to extends smaller consts into bigger)