import { addBlock, getBlockList, removeBlock } from "../models/blockDAO.js";
import { deleteFriend } from "../models/friendshipDAO.js";
import { createResponse } from "../utils/utils.js";

export async function blockHandler(request, reply) {
    try {
        const userId = request.user.id;
        const blockedId = parseInt(request.params.blockedId);

        if (!blockedId)
            return reply.code(400).send(createResponse(400, 'BLOCKED_REQUIRED'));
        
        if (userId === blockedId)
            return reply.code(400).send(createResponse(400, 'BLOCKED_INVALID'));
        
        let blockExist = await this.redis.sIsMember(`blocker:${userId}`, `${blockedId}`);
        if (!blockExist)
            blockExist = await this.redis.sIsMember(`blocker:${blockedId}`, `${userId}`);
        if (blockExist)
            return reply.code(400).send(createResponse(400, 'BLOCK_EXISTS'));
        
        await addBlock(this.db, userId, blockedId);
        await deleteFriend(this.db, userId, blockedId);
        
        this.rabbit.produceMessage(
        {
            type: 'FRIEND_REMOVED',
            to: userId, 
            data: { exFriendId: blockedId } 
        }, 'notifications.friend.removed' );

        await this.redis.sAdd(`blocker:${userId}`, `${blockedId}`);
        await this.redis.sAdd(`blocker:${blockedId}`, `${userId}`);

        return reply.code(200).send(createResponse(200, 'BLOCK_SUCCESS'));
    } catch (error) {
        console.log(error);
        return reply.code(500).send(createResponse(500, 'INTERNAL_SERVER_ERROR'));
    }
}


export async function unblockHandler(request, reply) {
    try {
        const userId = request.user.id;
        const blockedId = parseInt(request.params.blockedId);

        if (!blockedId)
            return reply.code(400).send(createResponse(400, 'BLOCKED_REQUIRED'));

        if (userId === blockedId)
            return reply.code(400).send(createResponse(400, 'BLOCKED_INVALID'));

        let blockExist = await this.redis.sIsMember(`blocker:${userId}`, `${blockedId}`);
        if (!blockExist)
            blockExist = await this.redis.sIsMember(`blocker:${blockedId}`, `${userId}`);
        if (!blockExist)
            return reply.code(400).send(createResponse(400, 'BLOCK_NOT_FOUND'));

        await removeBlock(this.db, userId, blockedId);

        await this.sRem(`blocker:${userId}`, `${blockedId}`);
        await this.sRem(`blocker:${blockedId}`, `${userId}`);

        return reply.code(200).send(createResponse(200, 'UNBLOCK_SUCCESS'));
    } catch (error) {
        console.log(error);
        return reply.code(500).send(createResponse(500, 'INTERNAL_SERVER_ERROR'));
    }
}

export async function getListHandler(request, reply) {
    try {
        const userId = request.user.id;

        const blockList = await getBlockList(this.db, userId);

        return reply.code(200).send(createResponse(200, 'BlOCK_LIST_FETCHED', { blockList: blockList }));
    } catch (error) {
        console.log(error);
        return reply.code(500).send(createResponse(500, 'INTERNAL_SERVER_ERROR'));
    }
}
