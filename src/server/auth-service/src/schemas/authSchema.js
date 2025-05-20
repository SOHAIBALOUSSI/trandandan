import { emailValidation, passwordValidation, usernameValidation } from "./validationSchemas.js"

export const registerSchema = {
    type: 'object',
    required: ['username', 'email', 'password', 'confirmPassword'],
    properties: {
        username:usernameValidation,
        email: emailValidation,
        password: passwordValidation,
        confirmPassword: passwordValidation,
    },
    additionalProperties: false
}

export const loginSchema = {
    oneOf: [
        {
            type: 'object',
            required: ['username', 'password'],
            properties: {
                username:usernameValidation,
                password: passwordValidation
            },
            additionalProperties: false
        },
        {
            type: 'object',
            required: ['email', 'password'],
            properties: {
                email: emailValidation,
                password: passwordValidation
            },
            additionalProperties: false
        }
    ]
}

export const tokenSchema = {
    type: 'object',
    required: ['token'],
    properties: {
        token: {
            type: 'string',
            pattern: '^[a-zA-Z0-9]\.+$'
        }
    },
    additionalProperties: false
}

export const totpCodeSchema = {
    type: 'object',
    required: ['totpCode'],
    properties: {
        totpCode: {
            type: 'string',
            minLength: 6,
            maxLength: 6
        }
    }
}