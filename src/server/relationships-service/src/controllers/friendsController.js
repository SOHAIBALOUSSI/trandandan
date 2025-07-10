import {
    addFriendRequest,
    updateFriendRequestStatus,
    deleteFriend,
    getFriendsByUserId,
    getPendingRequestsByUserId
  } from '../models/friendshipDAO.js';
import { createResponse } from '../utils/utils.js';
  
  export async function sendRequest(request, reply) {
      try {
          const requesterId = request.user.id;
          const { addresseeId } = request.body;
  
          if (!addresseeId)
            return reply.code(400).send(createResponse(400, 'ADDRESSEE_REQUIRED'));
  
          if (requesterId === addresseeId)
            return reply.code(400).send(createResponse(400, 'ADDRESSEE_INVALID'));
    
          let exists = await addFriendRequest(this.db, requesterId, addresseeId);
          if (exists)
            return reply.code(400).send(createResponse(200, 'FRIEND_REQUEST_ALREADY_SENT'));

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
  
          let isValid = await updateFriendRequestStatus(this.db, requesterId, addresseeId, 'accepted');
          if (!isValid)
            return reply.code(400).send(createResponse(200, 'FRIEND_REQUEST_INVALID'));

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
  
          let isValid = await updateFriendRequestStatus(this.db, requesterId, addresseeId, 'rejected');
          if (!isValid)
            return reply.code(400).send(createResponse(200, 'FRIEND_REQUEST_INVALID'));
          this.rabbit.produceMessage(
            { 
              type: 'FRIEND_REQUEST_REJECTED', 
              sender_id: addresseeId,
              recipient_id: requesterId 
            },
            'notifications.friend_request.rejected'
          );

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

      let isDeleted = await deleteFriend(this.db, userId, friendId);
      if (!isDeleted)
        return reply.code(400).send(createResponse(200, 'FRIEND_REQUEST_INVALID'));

      this.rabbit.produceMessage(
        { 
          type: 'FRIEND_REMOVED', 
          recipient_id: userId, 
          data: { exFriendId: friendId } 
        },
        'notifications.friend.removed'
      );

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
  