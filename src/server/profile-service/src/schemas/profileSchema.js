import { 
    avatarUrlValidation, 
    emailValidation, 
    floatValidation, 
    integerValidation, 
    usernameValidation 
} from "./validationSchemas.js"

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
        solde: integerValidation,
        rank: integerValidation,
        level: floatValidation,
		matches_played: integerValidation,
		matches_won: integerValidation,
		matches_lost: integerValidation
    },
    minProperties: 1,
    maxProperties: 9,
    additionalProperties: false
}