import Joi from "joi";

export const EditProfileSchema = Joi.object({
    name: Joi.object()
        .keys({
            first: Joi.string().min(2).max(256).required(),
            middle: Joi.string().min(2).max(256).allow(""),
            last: Joi.string().min(2).max(256).required()
        }).required(),
    
    phone: Joi.string()
        .ruleset.regex(/0[0-9]{1,2}-?\s?[0-9]{3}\s?[0-9]{4}/)
        .rule({ message: 'Please enter a valid phone number' })
        .required(),
    
    email: Joi.string()
        .ruleset.pattern(/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/)
        .rule({ message: 'Please enter a valid email address' })
        .required(),

    // password: Joi.string()
    //     .ruleset.regex(/((?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{9,20})/,)
    //     .rule({ message: 'Password mast be min 8 characters, an uppercase letter, a lowercase letter and a special character' })
    //     .required(),
    
    image: Joi.object()
        .keys({
            url: Joi.string().uri()
                .rule({ message: 'Please enter a valid url' })
                .allow(""),
            alt: Joi.string().min(2).max(256)
                .allow(""),
    }).allow(""),

    address: Joi.object()
        .keys({
            state: Joi.string().min(2).max(256)
                .allow(""),
            country: Joi.string().min(2).max(256).required(),
            city: Joi.string().min(2).max(256).required(),
            street: Joi.string().min(2).max(256).required(),
            houseNumber: Joi.number().min(2).max(256).required(),
            zip: Joi.number().required()
    }).required(),

    // isBusiness: Joi.boolean().required()

});