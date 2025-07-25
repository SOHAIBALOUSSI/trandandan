import { getFriendsByUserId } from "../models/friendshipDAO.js";
import WebSocket from 'ws';


export function createResponse(status, code, data) {
    return ({
        statusCode: status,
        code: code,
        data: data
    });
}

async function getFriendsStatus(db, socket, onlineUsers){

    const friendsIds = await getFriendsByUserId(db, socket.userId);
    console.log("FRIENDS IDS ==> ", friendsIds);
    const friends = friendsIds.map(friend => {
        console.log("Handling userId ", friend.friend_id)
        if (!onlineUsers.has(friend.friend_id))
            return { friendId: friend.friend_id, isOnline: false };
        return { friendId: friend.friend_id, isOnline: true };
    })
    console.log(friends);
    return friends;

}

export async function displayFriendsStatus(db, socket, onlineUsers) {
    const friends = await getFriendsStatus(db, socket, onlineUsers);

    if (socket.isAuthenticated && socket.readyState === WebSocket.OPEN)
        socket.send(JSON.stringify({ friendsStatuses: friends }));
}