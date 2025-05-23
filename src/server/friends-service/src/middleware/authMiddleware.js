import jwt from 'jsonwebtoken';

export async function verifyToken(request, reply) {
    const authHeader = request.headers["authorization"];
    if (!authHeader || !authHeader.startsWith('Bearer '))
        return reply.code(401).send(createResponse(401, 'TOKEN_INVALID'));

    const token = authHeader.split(' ')[1];
    if (!token)
        return reply.code(401).send(createResponse(401, 'TOKEN_REQUIRED'));

    try {
        const payload = jwt.verify(token, process.env.AJWT_SECRET_KEY);
        request.user = payload;
    } catch (error) {
        return reply.code(401).send(createResponse(401, 'TOKEN_INVALID'));
    }
}