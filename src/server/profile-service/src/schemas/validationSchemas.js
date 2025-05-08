export const usernameValidation = {
    type: 'string',
    minLength: 3,
    maxLength: 15,
    pattern: '^[a-zA-Z0-9_]+$'
}

export const emailValidation = {
    type: 'string',
    format: 'email'
}

export const avatarUrlValidation = {
    type: 'string',
    format: 'uri',
    maxLength: 255
}

export const soldeValidation = {
    type: 'integer',
    minimum: 0,
    maximum: 10000
}