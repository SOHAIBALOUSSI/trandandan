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

export const passwordValidation = {
    type: 'string',
    pattern: '^[a-z]+[A-Z]+[0-9]+$',
    minLength: 8,
    maxLength: 50
}