import Joi from "joi";

export const LoginSchema = Joi.object({
    email: Joi.string().email({tlds: {allow: false}}).required(),
    password: Joi.string().ruleset.pattern(/((?=.*[0-9]{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{8,20})/)
        .rule({
        message: "Password mast be min 8 characters, an uppercase letter, a lowercase letter and a special character"
    }).required()
});