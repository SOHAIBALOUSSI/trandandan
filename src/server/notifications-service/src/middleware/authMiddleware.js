import jwt from 'jsonwebtoken';
import { parse } from 'cookie'

export function getAuthCookies(request) {
    const authCookies = request.headers.cookie || '';
    const cookies = parse(authCookies);
    return {
        accessToken: cookies.accessToken,
        refreshToken: cookies.refreshToken
    };
}

export function verifyToken(ws, request) {
    try {
        let cookie = getAuthCookies(request);
        
        const payload = jwt.verify(cookie.accessToken, process.env.AJWT_SECRET_KEY);
        ws.userId = payload.id;
        ws.isAuthenticated = true;
        console.log(`WebSocket: User ${ws.userId} authenticated`);
    } catch (error) {
        console.log('WebSocket: ', error);
        ws.close(1008, 'Token invalid');
    }
}