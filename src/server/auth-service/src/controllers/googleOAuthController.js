import { google } from 'googleapis'

const oauth2Client = google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
)

export async function googleSetupHandler(request, reply) {
    
}

export async function googleLoginHandler(request, reply) {
    
}