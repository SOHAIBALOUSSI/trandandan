export const profileSchema = {
    type: 'object',
    required: ['username'],
    properties: {
        username: {
            type: 'string',
            minLength: 3,
            maxLength: 15,
            pattern: '^[a-zA-Z0-9_]+$'
        }
    }
}