import { avatarUrlValidation, emailValidation, soldeValidation, usernameValidation } from "./validationSchemas"

export const createProfileSchema = {
    type: 'object',
    required: ['username'],
    properties: {
        username: usernameValidation
    },
    additionalProperties: false
}

export const updateProfileSchema = {
    type: 'object',
    required: ['username', 'email', 'avatar_url', 'solde'],
    properties: {
        username: usernameValidation,
        email: emailValidation,
        avatar_url :avatarUrlValidation,
        solde: soldeValidation
    },
    additionalProperties: false
}