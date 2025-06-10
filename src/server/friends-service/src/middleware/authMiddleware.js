import jwt from 'jsonwebtoken';
import { createResponse } from '../utils/utils.js';
import { parse } from 'cookie'

export function getAuthCookies(request) {
    const authCookies = request.headers.cookie || '';
    const cookies = parse(authCookies);
    return {
        accessToken: cookies.accessToken,
        refreshToken: cookies.refreshToken
    };
}


export async function verifyToken(request, reply) {
    try {
        let cookie = getAuthCookies(request);
        
        const payload = jwt.verify(cookie.accessToken, process.env.AJWT_SECRET_KEY);
        request.user = payload;
    } catch (error) {
        if (error.name === 'TokenExpiredError')
            return reply.code(401).send(createResponse(401, 'ACCESS_TOKEN_EXPIRED'))    
        return reply.code(401).send(createResponse(401, 'ACCESS_TOKEN_INVALID'));
    }
}