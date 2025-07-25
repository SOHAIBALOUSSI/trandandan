import { 
    fetchAllProfiles,
    findDuplicateUsername, 
    getProfileById, 
    updateAvatarUrlById, 
    updateProfileById 
} from "../models/profileDAO.js";
import { createResponse } from "../utils/utils.js";
import fs from 'node:fs';
import { pipeline } from 'node:stream/promises';
import path from 'node:path';

export async function getProfile(request, reply) {
    try {
        const { id } = request.params;
        
        const profile = await getProfileById(this.db, id);
        if (!profile)
            return reply.code(400).send(createResponse(400, 'PROFILE_NOT_FOUND'));
        
        return reply.code(200).send(createResponse(200, 'PROFILE_FETCHED', { profile: profile }));
    } catch (error) {
        console.log(error);
        return reply.code(500).send(createResponse(500, 'INTERNAL_SERVER_ERROR'));
    }
}

export async function updateProfile(request, reply) {
    try {
        const { id } = request.params;
        const tokenId = request.user?.id;
        if (tokenId != id)
            return reply.code(403).send(createResponse(403, 'UNAUTHORIZED'));
        
        const { username, matches_won, matches_lost, hasWon } = request.body;
        
        const profile = await getProfileById(this.db, id);
        if (!profile)
            return reply.code(400).send(createResponse(400, 'PROFILE_NOT_FOUND'));
        
        const updatedFields = {};
        if (username) {
            const dupUser = await findDuplicateUsername(this.db, username);
            if (dupUser)
                return reply.code(400).send(createResponse(400, 'USERNAME_EXISTS'));
            updatedFields.username = username;
            this.rabbit.produceMessage({
                id: id,
                username: username
            }, 'auth.username.updated');
        }
        
        if (matches_won !== undefined && hasWon) {
            updatedFields.matches_won = matches_won;
            updatedFields.matches_played = profile.matches_lost + matches_won;
            updatedFields.level = (matches_won * 100 + profile.matches_lost * 50) / 500;
            updatedFields.solde = profile.solde + 5;
        } 
        if (matches_lost !== undefined && !hasWon) {
            updatedFields.matches_lost = matches_lost;
            updatedFields.matches_played = profile.matches_won + matches_lost;
            updatedFields.level = (matches_lost * 50 + profile.matches_won * 100) / 500;
            updatedFields.solde = profile.solde + 1;
        } 


        if (Object.keys(updatedFields).length === 0)
            return reply.code(400).send(createResponse(400, 'MISSING_FIELDS'));
        
        const changes = await updateProfileById(this.db, id, updatedFields);
        if (changes === 0)
            return reply.code(400).send(createResponse(400, 'ZERO_CHANGES'));
        const updatedProfile = await getProfileById(this.db, id);
        await this.redis.sendCommand([
            'JSON.SET',
            `player:${tokenId}`,
            '$',
            JSON.stringify(updatedProfile)
        ])


        return reply.code(200).send(createResponse(200, 'PROFILE_UPDATED', { profile: updatedProfile }));
    } catch (error) {
        console.log(error);
        return reply.code(500).send(createResponse(500, 'INTERNAL_SERVER_ERROR'));
    }
}

export async function uploadAvatarUrl(request, reply) {
    try {
        const userId = request.user?.id;
        const data = await request.file();
        console.log('DATA received: ', data);
        if (!data)
            return reply.code(400).send(createResponse(400, 'FILE_REQUIRED'));

        const ext = path.extname(data.filename);
        const fileName = `${userId}_${Date.now()}${ext}`;
        const uploadPath = path.join(process.cwd(), 'uploads', 'avatars', fileName);
        console.log("Upload path: ", uploadPath);
        fs.mkdirSync(path.dirname(uploadPath), { recursive: true });

        await pipeline(data.file, fs.createWriteStream(uploadPath));
        
        await updateAvatarUrlById(this.db, userId, fileName);
        return reply.code(200).send(createResponse(200, 'AVATAR_UPLOADED', { avatar_url: fileName }));
    } catch (error) {
        console.log(error);
        return reply.code(500).send(createResponse(500, 'INTERNAL_SERVER_ERROR'));
    }
}

export async function getAvatarUrl(request, reply) {
    try {
        const { fileName } = request.params;
        if (!fileName)
            return reply.code(400).send(createResponse(400, 'FILENAME_REQUIRED'));

        const filePath = path.join(process.cwd(), 'uploads', 'avatars', fileName);
        if (!fs.existsSync(filePath))
            return reply.code(404).send(createResponse(404, 'FILE_NOT_FOUND'));

        const ext = path.extname(fileName).toLowerCase();
        const mimeType = ((ext === '.jpeg' || ext === '.jpg') ? 'image/jpeg' :
            ext === '.png' ? 'image/png' :
            ext === '.webp' ? 'image/webp' :
            'application/octet-stream');
        const stream = fs.createReadStream(filePath);

        stream.on('error', (err) => {
            console.error('Stream error:', err);
            reply.code(500).send(createResponse(500, 'INTERNAL_SERVER_ERROR'));
        });
        
        return reply.type(mimeType).send(stream);
    } catch (error) {
        console.log(error);
        return reply.code(500).send(createResponse(500, 'INTERNAL_SERVER_ERROR'));
    }
}

export async function getAllProfiles(request, reply) {
    try {
        const allProfiles = await fetchAllProfiles(this.db);
        return reply.code(200).send(createResponse(200, 'PROFILES_FETCHED', { profiles: allProfiles }));
    } catch (error) {
        console.log(error);
        return reply.code(500).send(createResponse(500, 'INTERNAL_SERVER_ERROR'));
    }
}