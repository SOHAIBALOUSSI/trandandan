import { avatarUrlValidation, emailValidation, soldeValidation, usernameValidation } from "./validationSchemas.js"

export const createProfileSchema = {
    type: 'object',
    required: ['username'],
    properties: {
        username: usernameValidation,
        email: emailValidation
    },
    additionalProperties: false
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