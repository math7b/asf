import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { verifyToken } from "../token";
import { pubSub } from "../../utils/pub-sub";

export async function deleteComment(app: FastifyInstance) {
    app.delete('/comment/:commentId', async (request, reply) => {
        const zCommentId = z.object({
            commentId: z.string(),
        })
        const zCommentBody = z.object({
            userId: z.string(),
            token: z.string(),
        })
        const { commentId } = zCommentId.parse(request.params)
        const { userId, token } = zCommentBody.parse(request.query)
        const verifiedToken = verifyToken(token);
        if (!verifiedToken.valid) {
            return reply.status(400).send({ message: "Not authorized" });
        }
        if (!commentId) {
            return reply.status(404).send({ message: "Error deleting the comment" });
        }
        const deleteReplies = async (id: string) => {
            const replies = await prisma.comment.findMany({
                where: { parentCommentId: id },
                select: { id: true },
            });
            for (const reply of replies) {
                await deleteReplies(reply.id);
            }
            await prisma.comment.deleteMany({
                where: {
                    parentCommentId: id,
                    userId: userId,
                },
            });
        };
        await deleteReplies(commentId);
        await prisma.comment.delete({
            where: {
                id: commentId,
                userId: userId,
            },
        })
        pubSub.publish('asf', { action: 'delete', type: 'comment', data: { commentId, userId } })
        return reply.status(201).send()
    })
}