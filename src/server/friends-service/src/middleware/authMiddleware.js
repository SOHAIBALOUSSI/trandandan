import jwt from 'jsonwebtoken';

export async function verifyToken(request, reply) {
    const authHeader = request.headers["authorization"];
    if (!authHeader || !authHeader.startsWith('Bearer '))
        return reply.code(401).send({ error: 'Authorization header must be in Bearer format.' });

    const token = authHeader.split(' ')[1];
    if (!token)
        return reply.code(401).send({ error: `Authorization token is required.` });

    try {
        const payload = jwt.verify(token, process.env.AJWT_SECRET_KEY);
        request.user = payload;
    } catch (error) {
        return reply.code(401).send({ error: `Invalid or expired token.` });
    }
}