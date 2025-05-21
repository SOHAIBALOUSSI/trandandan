import {
    addFriendRequest,
    updateFriendRequestStatus,
    deleteFriend,
    getFriendsByUserId,
    getPendingRequestsByUserId
  } from '../models/friendshipDAO.js';
  
  export async function sendRequest(request, reply) {
      try {
          const requesterId = request.user.id;
          const { addresseeId } = request.body;
  
          if (!addresseeId) {
              return reply.code(400).send({ error: 'addresseeId is required' });
          }
  
          if (requesterId === addresseeId)
            return reply.code(400).send({ error: 'You cannot friend yourself' });
    
          await addFriendRequest(this.db, requesterId, addresseeId);
  
          return reply.code(201).send({ message: 'Friend request sent' });
      } catch (error) {
          return reply.code(500).send({ error: 'Internal server error', details: error.message });
      }
  }
  
  export async function acceptRequest(request, reply) {
      try {
          const userId = request.user.id;
          const { requesterId } = request.body;
  
          if (!requesterId)
            return reply.code(400).send({ error: 'requesterId is required' });
  
          await updateFriendRequestStatus(this.db, requesterId, userId, 'accepted');
  
          return reply.code(200).send({ message: 'Friend request accepted' });
      } catch (error) {
          return reply.code(500).send({ error: 'Internal server error', details: error.message });
      }
  }
  
  export async function rejectRequest(request, reply) {
      try {
          const userId = request.user.id;
          const { requesterId } = request.body;
  
          if (!requesterId)
            return reply.code(400).send({ error: 'requesterId is required' });
  
          await updateFriendRequestStatus(this.db, requesterId, userId, 'rejected');
  
          return reply.code(200).send({ message: 'Friend request rejected' });
      } catch (error) {
          return reply.code(500).send({ error: 'Internal server error', details: error.message });
      }
  }
  
  export async function removeFriend(request, reply) {
      try {
          const userId = request.user.id;
          const friendId = parseInt(request.params.friendId);
  
          if (!friendId)
            return reply.code(400).send({ error: 'friendId is required' });
  
          await deleteFriend(this.db, userId, friendId);
  
          return reply.code(200).send({ message: 'Friend removed' });
      } catch (error) {
          return reply.code(500).send({ error: 'Internal server error', details: error.message });
      }
  }
  
  export async function listFriends(request, reply) {
      try {
          const userId = request.user.id;
  
          const friends = await getFriendsByUserId(this.db, userId);
  
          return reply.code(200).send({ friends });
      } catch (error) {
          return reply.code(500).send({ error: 'Internal server error', details: error.message });
      }
  }
  
  export async function listRequests(request, reply) {
      try {
          const userId = request.user.id;
  
          const requests = await getPendingRequestsByUserId(this.db, userId);
  
          return reply.code(200).send({ requests });
      } catch (error) {
          return reply.code(500).send({ error: 'Internal server error', details: error.message });
      }
  }
  