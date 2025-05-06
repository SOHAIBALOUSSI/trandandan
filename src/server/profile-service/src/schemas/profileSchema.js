export const profileSchema = {
    type: 'object',
    required: ['id', 'username'],
    properties: {
        id: {
            type: 'integer',
            minimum: 1
        },
        username: {
            type: 'string',
            minLength: 3,
            maxLength: 15,
            pattern: '^[a-zA-Z0-9_]+$'
        }
    }
}