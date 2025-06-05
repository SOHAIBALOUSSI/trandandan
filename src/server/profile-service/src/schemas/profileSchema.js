import { avatarUrlValidation, emailValidation, soldeValidation, usernameValidation } from "./validationSchemas.js"

export const createProfileSchema = {
    oneOf: [
        {
            type: 'object',
            required: ['username', 'email', 'gender'],
            properties: {
                username: usernameValidation,
                email: emailValidation,
                gender: { enum: ['F', 'M'] }
            },
            additionalProperties: false
        },
        {
            type: 'object',
            required: ['username', 'email', 'avatar_url'],
            properties: {
                username: usernameValidation,
                email: emailValidation,
                avatar_url: avatarUrlValidation
            },
            additionalProperties: false
        }
    ]
}

export const updateProfileSchema = {
    type: 'object',
    properties: {
        username: usernameValidation,
        email: emailValidation,
        avatar_url :avatarUrlValidation,
        solde: soldeValidation
    },
    minProperties: 1,
    maxProperties: 4,
    additionalProperties: false
}