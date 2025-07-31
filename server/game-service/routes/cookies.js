
import { serialize, parse } from 'cookie';

const COOKIES_OPTS = {
    httpOnly: false,
    secure: false,
    sameSite: 'Lax',
    path: '/'
};

// ... (existing functions remain the same) ...

// NEW: Set connectionId and userName
export function setUserCookies(reply, connectionId, userName) {
    const connectionIdCookie = serialize('player', connectionId, {
        ...COOKIES_OPTS,
        maxAge: 60 * 60 * 24 * 30 // 30 days
    });

    const userNameCookie = serialize('userName', userName, {
        ...COOKIES_OPTS,
        maxAge: 60 * 60 * 24 * 30 // 30 days
    });

    reply.header('Set-Cookie', [connectionIdCookie, userNameCookie]);
}

// NEW: Get connectionId and userName
export function getUserCookies(request) {
    const cookies = parse(request.headers.cookie || '');
    return {
        connectionId: cookies.player,
        userName: cookies.userName
    };
}

// NEW: Clear user cookies (optional)
export function clearUserCookies(reply) {
    const connectionIdCookie = serialize('player', '', {
        ...COOKIES_OPTS,
        maxAge: 0
    });

    const userNameCookie = serialize('userName', '', {
        ...COOKIES_OPTS,
        maxAge: 0
    });

    reply.header('Set-Cookie', [connectionIdCookie, userNameCookie]);
}