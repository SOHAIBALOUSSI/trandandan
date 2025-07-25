export function createResponse(status, code, data) {
    return ({
        statusCode: status,
        code: code,
        data: data
    });
}

import https from 'https'
import fs from 'fs';
import path from 'node:path';

export async function downloadAvatarUrl(avatar_url, userId) {
    const ext = path.extname(avatar_url);
    const fileName = `${userId}_${Date.now()}${ext}`;

    const uploadPath = path.join(process.cwd(), 'uploads', 'avatars', fileName);
    console.log(uploadPath);
    fs.mkdirSync(path.dirname(uploadPath), { recursive: true });  
    
    return new Promise((resolve, reject) => {

        const file = fs.createWriteStream(uploadPath);
        
        const request = https.get(avatar_url, function(response) {
            response.pipe(file);
            file.on("finish", () => {
                file.close();
                console.log("Download Completed at ", uploadPath);
                resolve(uploadPath);
                
            }).on('error', (err) => {
                fs.unlink(uploadPath, () => {});
                console.error('Error downloading file:', err.message);
            });
        });
        
        request.on('error', (err) => {
            fs.unlink(uploadPath, () => {reject(err)});
        });
    })
}