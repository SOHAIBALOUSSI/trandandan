import { addBlock, findBlock, removeBlock } from "../models/blockDAO.js";
import { createResponse } from "../utils/utils.js";

export async function blockHandler(request, reply) {
    try {
        const userId = request.user.id;
        const blockedId = parseInt(request.params.blockedId);

        if (!blockedId)
            return reply.code(400).send(createResponse(400, 'BLOCKED_REQUIRED'));

        const idExist = await this.redis.sIsMember('userIds', `${blockedId}`);
        console.log('idExist value: ', idExist);
        if (userId === blockedId || !idExist)
            return reply.code(400).send(createResponse(400, 'BLOCKED_INVALID'));

        const blockExist = await findBlock(this.db, blockedId, userId);
        if (blockExist)
            return reply.codE(400).send(createResponse(400, 'BLOCK_EXISTS'));

        await addBlock(this.db, userId, blockedId);

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

        const idExist = await this.redis.sIsMember('userIds', `${blockedId}`);
        console.log('idExist value: ', idExist);
        if (userId === blockedId || !idExist)
            return reply.code(400).send(createResponse(400, 'BLOCKED_INVALID'));

        const blockExist = await findBlock(this.db, blockedId, userId);
        if (blockExist)
            return reply.codE(400).send(createResponse(400, 'BLOCK_NOT_FOUND'));

        await removeBlock(this.db, userId, blockedId);

        return reply.code(200).send(createResponse(200, 'UNBLOCK_SUCCESS'));
    } catch (error) {
        console.log(error);
        return reply.code(500).send(createResponse(500, 'INTERNAL_SERVER_ERROR'));
    }
}