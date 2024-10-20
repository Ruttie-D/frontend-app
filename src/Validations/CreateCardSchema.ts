import Joi from "joi";

export const CreateCardSchema = Joi.object({
    title: Joi.string().min(2).max(256).required(),

    subtitle: Joi.string().min(2).max(256).required(),

    description: Joi.string().min(2).max(1024).required(),

    phone: Joi.string()
        .ruleset.regex(/0[0-9]{1,2}-?\s?[0-9]{3}\s?[0-9]{4}/)
        .rule({ message: 'Please enter a valid phone number' })
        .required(),
    
    email: Joi.string()
        .ruleset.pattern(/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/)
        .rule({ message: 'Please enter a valid email address' })
        .required(),

    web: Joi.string().min(14).allow(""),

    image: Joi.object()
        .keys({
            url: Joi.string().uri()
                .rule({ message: 'Please enter a valid url' })
                .required(),
            alt: Joi.string().min(2).max(256)
                .required()
        }).required(),
    
    address: Joi.object()
        .keys({
            state: Joi.string().min(2).max(256).allow(""),
            country: Joi.string().min(2).max(256).required(),
            city: Joi.string().min(2).max(256).required(),
            street: Joi.string().min(2).max(256).required(),
            houseNumber: Joi.number().min(1).max(256).required(),
            zip: Joi.number().min(1).max(256).allow("")
    }).required(),

});