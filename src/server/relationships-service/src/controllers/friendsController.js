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
          
          await addFriendRequest(this.db, requesterId, addresseeId);

          this.rabbit.produceMessage(
            { 
              type: 'FRIEND_REQUEST_SENT', 
              from: requesterId, 
              to: addresseeId 
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
  
          if (requesterId === addresseeId)
            return reply.code(400).send(createResponse(400, 'REQUESTER_INVALID'));

          await updateFriendRequestStatus(this.db, requesterId, addresseeId, 'accepted');

          this.rabbit.produceMessage(
            { 
              type: 'FRIEND_REQUEST_ACCEPTED', 
              from: addresseeId, 
              to: requesterId 
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
          
            if (requesterId === addresseeId)
              return reply.code(400).send(createResponse(400, 'REQUESTER_INVALID'));

          await updateFriendRequestStatus(this.db, requesterId, addresseeId, 'rejected');
  
          this.rabbit.produceMessage(
            { 
              type: 'FRIEND_REQUEST_REJECTED', 
              from: addresseeId,
              to: requesterId 
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

      if (userId === friendId)
        return reply.code(400).send(createResponse(400, 'FRIEND_INVALID'));

      await deleteFriend(this.db, userId, friendId);

      this.rabbit.produceMessage(
        { 
          type: 'FRIEND_REMOVED', 
          to: userId, 
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
  