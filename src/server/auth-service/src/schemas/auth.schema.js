export const registerSchema = {
    type: 'object',
    required: ['username', 'email', 'password', 'confirmPassword', 'gender'],
    properties: {
        username: {
            type: 'string',
            minLength: 3,
            maxLength: 15,
            pattern: '^[a-zA-Z0-9_]+$'
        },
        email: {
            type: 'string',
            format: 'email'
        },
        password: {
            type: 'string',
            minLength: 6,
            maxLength: 50
        },
        confirmPassword: {
            type: 'string',
            minLength: 6,
            maxLength: 50
        },
        gender: {
            type: 'string',
            enum: ['F', 'M']
        }
    },
    additionalProperties: false
}

export const loginSchema = {
    oneOf: [
        {
            type: 'object',
            required: ['username', 'password'],
            properties: {
                username: {
                    type: 'string',
                    minLength: 3,
                    maxLength: 15,
                    pattern: '^[a-zA-Z0-9_]+$'
                },
                password: {
                    type: 'string',
                    minLength: 6,
                    maxLength: 50
                }
            },
            additionalProperties: false
        },
        {
            type: 'object',
            required: ['email', 'password'],
            properties: {
                email: {
                    type: 'string',
                    format: 'email'
                },
                password: {
                    type: 'string',
                    minLength: 6,
                    maxLength: 50
                }
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
            pattern: '^[a-zA-Z0-9.]+$'
        }
    },
    additionalProperties: false
}