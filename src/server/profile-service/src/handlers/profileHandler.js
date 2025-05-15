import { addProfile, getProfileById, searchProfile, updateProfileById } from "../models/profileDAO.js";

export async function createProfile(context, payload) {
    try {
        const { id, username, email } = payload.data;
        console.log("Body received from profile:", payload.data);
        if (!username || !email)
            return ({ code: 400, error: 'Missing required fields' });

        const profileExists = await searchProfile(context.db, id, username, email);
        if (profileExists)
            return ({ code: 400, error: 'Profile already exists' });
        
        await addProfile(context.db, id, username, email);

        return ({ code: 201, message: 'Profile created' })
    } catch (error) {
        console.log(error);
        return ({ code: 500, error: 'Internal server error' });
    }
}

export async function getProfile(context, payload) {
    try {
        
        const { id } = payload.data;
        
        const profile = await getProfileById(context.db, id);
        if (!profile)
            return ({ code:404, error: 'Profile not found' });
        
        return ({ code: 200, profile })
    } catch (error) {
        console.log(error);
        return ({ code: 500, error: 'Internal server error' });
    }
}

export async function updateProfile(context, payload) {
    try {
        const { id, username, email, avatar_url, solde } = payload.data;
        
        const profile = await getProfileById(context.db, id);
        if (!profile)
            return ({ code:404, error: 'Profile not found' });
        
        const updatedFields = {};
        if (username) updatedFields.username = username;
        if (email) updatedFields.email = email;
        if (avatar_url) updatedFields.avatar_url = avatar_url;
        if (typeof solde === 'number') updatedFields.solde = solde;

        if (Object.keys(updatedFields).length === 0)
            return ({ code: 400, error: 'No fields to update' });
        
        const changes = await updateProfileById(context.db, id, updatedFields);
        if (changes === 0)
            return ({ code: 400, error: 'No changes were made'});
        const updatedProfile = await getProfileById(context.db, id);

        return ({ code: 200, message: 'Profile updated.', profile: updatedProfile})
    } catch (error) {
        console.log(error);
        return ({ code: 500, error: 'Internal server error' });
    }
}