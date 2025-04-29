import bcrypt from 'bcrypt';
import { findUser, addUser, findUserById } from '../models/auth.model.js';

const hash = bcrypt.hash;
const compare = bcrypt.compare;

export async function loginHandler(request, reply) {
    try {
        const { username, email, password } = request.body;
        let user;
        user = await findUser(this.db, username, email);
        if (!user)
            return reply.status(404).send({ error: 'User not found.' });
        const matched = await compare(password, user.password);
        if (!matched)
            return reply.status(400).send({ error: 'Invalid credentials.' });
        
        const payload = { id: user.id }
        const token = this.jwt.sign(payload);
        
        return reply.status(200).send({ token });
    } catch (error) {
        return reply.status(500).send({ error: 'Internal server error.' });
    }
}

export async function registerHandler(request, reply) {
    try {
        
    } catch (error) {
        return reply.status(500).send({ error: 'Internal server error.' });
    }
    const { email, username, password, confirmPassword } = request.body;
    
    if (password !== confirmPassword)
        return reply.status(400).send({ error: 'Passwords don\'t match.'});
    
    const userExist = await findUser(this.db, username, email);
    if (userExist)
        return reply.status(400).send({ error: 'Username or email already in use.' });
    
    const hashedPassword = await hash(password, 10);

    await addUser(this.db, username, email, hashedPassword);

    const payload = { id: user.id }
    const token = this.jwt.sign(payload);

    return reply.status(201).send({ token });
}

export async function logoutHandler(request, reply) {
    return reply.status(200).send({ message: `User logged out.` });
}

export async function meHandler(request, reply) {
    try {
        
        const userId = request.user;
        
        const user = await findUserById(this.db, userId);
        if (!user)
            return reply.status(404).send({ error: 'User not found.' });
        
        return reply.status(200).send({ id: user.id, username: user.username, email: user.email });
    } catch (error) {
        return reply.status(500).send({ error: 'Internal server error.' });
    }
}