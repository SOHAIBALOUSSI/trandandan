import { verifyWSToken } from '../middleware/authMiddleware.js';
import {
    addFriendRequest,
    updateFriendRequestStatus,
    deleteFriend,
    getFriendsByUserId,
    getPendingRequestsByUserId,
    deleteFriendships
  } from '../models/friendshipDAO.js';
import { createResponse, displayFriendsStatus } from '../utils/utils.js';
  
export async function sendRequest(request, reply) {
  try {
        const requesterId = request.user.id;
        const { addresseeId } = request.body;

        if (!addresseeId)
          return reply.code(400).send(createResponse(400, 'ADDRESSEE_REQUIRED'));

        if (requesterId === addresseeId)
          return reply.code(400).send(createResponse(400, 'ADDRESSEE_INVALID'));

        let blockExist = await this.redis.sIsMember(`blocker:${requesterId}`, `${addresseeId}`);
        if (!blockExist)
            blockExist = await this.redis.sIsMember(`blocker:${addresseeId}`, `${requesterId}`);
        if (blockExist)
            return reply.code(400).send(createResponse(400, 'BLOCK_EXISTS'));
  
        let exists = await addFriendRequest(this.db, requesterId, addresseeId);
        if (exists)
          return reply.code(400).send(createResponse(400, 'FRIEND_REQUEST_ALREADY_SENT'));

        this.rabbit.produceMessage(
          { 
            type: 'FRIEND_REQUEST_SENT',
            sender_id: requesterId, 
            recipient_id: addresseeId 
          },
          'notifications.friend_request.sent'
        );

        return reply.code(200).send(createResponse(200, 'FRIEND_REQUEST_SENT'));
    } catch (error) {
      console.log(error);
      return reply.code(500).send(createResponse(500, 'INTERNAL_SERVER_ERROR'));
    }
}

export async function acceptRequest(request, reply) {
  try {
        const addresseeId = request.user.id;
        const { requesterId } = request.body;

        if (!requesterId)
          return reply.code(400).send(createResponse(400, 'REQUESTER_REQUIRED'));

        const idExist = await this.redis.sIsMember('userIds', `${requesterId}`);
        console.log('idExist value: ', idExist);
        if (!idExist || addresseeId === requesterId)
          return reply.code(400).send(createResponse(400, 'REQUESTER_INVALID'));
        
        let isValid = await updateFriendRequestStatus(this.db, requesterId, addresseeId, 'accepted');
        if (!isValid)
          return reply.code(400).send(createResponse(400, 'FRIEND_REQUEST_INVALID'));

        this.rabbit.produceMessage(
          { 
            type: 'FRIEND_REQUEST_ACCEPTED', 
            sender_id: addresseeId, 
            recipient_id: requesterId 
          },
          'notifications.friend_request.accepted'
        );

        return reply.code(200).send(createResponse(200, 'FRIEND_REQUEST_ACCEPTED'));
    } catch (error) {
      console.log(error);
      return reply.code(500).send(createResponse(500, 'INTERNAL_SERVER_ERROR'));
    }
}

export async function rejectRequest(request, reply) {
  try {
        const addresseeId = request.user.id;
        const { requesterId } = request.body;

        if (!requesterId)
          return reply.code(400).send(createResponse(400, 'REQUESTER_REQUIRED'));

        const idExist = await this.redis.sIsMember('userIds', `${requesterId}`);
        console.log('idExist value: ', idExist);
        if (!idExist || addresseeId === requesterId)
          return reply.code(400).send(createResponse(400, 'REQUESTER_INVALID'));
        
        let isValid = await deleteFriendships(this.db, addresseeId);
        if (!isValid)
          return reply.code(400).send(createResponse(400, 'FRIEND_REQUEST_INVALID'));

        return reply.code(200).send(createResponse(200, 'FRIEND_REQUEST_REJECTED'));
    } catch (error) {
      console.log(error);
      return reply.code(500).send(createResponse(500, 'INTERNAL_SERVER_ERROR'));
    }
}

export async function removeFriend(request, reply) {
  try {
    const userId = request.user.id;
    const friendId = parseInt(request.params.friendId);

    if (!friendId)
      return reply.code(400).send(createResponse(400, 'FRIEND_REQUIRED'));

    const idExist = await this.redis.sIsMember('userIds', `${friendId}`);
    console.log('idExist value: ', idExist);
    if (!idExist || userId === friendId)
      return reply.code(400).send(createResponse(400, 'FRIEND_INVALID'));
    
    let isDeleted = await deleteFriend(this.db, userId, friendId);
    if (!isDeleted)
      return reply.code(400).send(createResponse(200, 'FRIEND_REQUEST_INVALID'));

    return reply.code(200).send(createResponse(200, 'FRIEND_REMOVED'));
  } catch (error) {
    console.log(error);
    return reply.code(500).send(createResponse(500, 'INTERNAL_SERVER_ERROR'));
  }
}

export async function listFriends(request, reply) {
  try {
    const userId = request.user.id;

    const friends = await getFriendsByUserId(this.db, userId);

    return reply.code(200).send(createResponse(200, 'FRIENDS_LISTED', { friends: friends }));
  } catch (error) {
    console.log(error);
    return reply.code(500).send(createResponse(500, 'INTERNAL_SERVER_ERROR'));
  }
}

export async function listRequests(request, reply) {
  try {
      const userId = request.user.id;

      const requests = await getPendingRequestsByUserId(this.db, userId);

      return reply.code(200).send(createResponse(200, 'REQUESTS_LISTED', { requests: requests }));
    } catch (error) {
      console.log(error);
      return reply.code(500).send(createResponse(500, 'INTERNAL_SERVER_ERROR'));
    }
}


const onlineUsers = new Map();

export async function getFriendsStatus(socket, request) {
  try {
    socket.userId = null;
    socket.isAuthenticated = false;
    await verifyWSToken(socket, request, this.redis);
    if (socket.userId) {
        if (!onlineUsers.has(socket.userId))
            onlineUsers.set(socket.userId, new Set());
        onlineUsers.get(socket.userId).add(socket);
        displayFriendsStatus(this.db, socket, onlineUsers);
    }
    else {
        socket.close(3000, 'Unauthorized');
        return ;
    }

    setInterval(displayFriendsStatus, 5000, this.db, socket, onlineUsers);

    socket.on('error', (error) => {
        console.error('FastifyWebSocket: Client error:', error);
    });

    socket.on('close', () => {
        console.log('FastifyWebSocket: Client disconnected.');
        if (socket.isAuthenticated && onlineUsers.has(socket.userId)) {
          onlineUsers.get(socket.userId).delete(socket);
          if (onlineUsers.get(socket.userId).size === 0) 
            onlineUsers.delete(socket.userId);
        }
    })
} catch (error) {
    console.log(error);
    socket.close(1008, 'Malformed payload');
}    
}