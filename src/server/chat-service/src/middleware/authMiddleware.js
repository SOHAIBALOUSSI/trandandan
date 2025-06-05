import jwt from 'jsonwebtoken';

export function verifyToken(ws, token) {
    if (!token) {
        console.log('WebSocket: Token required');
        ws.close(1008, 'Token required');
    }

    try {
        const payload = jwt.verify(token, process.env.AJWT_SECRET_KEY);
        ws.userId = payload.id;
        ws.isAuthenticated = true;
        console.log(`WebSocket: User ${ws.userId} authenticated`);
        return true;
    } catch (error) {
        console.log('WebSocket: ', error);
        ws.close(1008, 'Token invalid');
        return false;
    }
}