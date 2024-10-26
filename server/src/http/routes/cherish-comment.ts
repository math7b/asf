import { FastifyInstance } from "fastify";
import z from "zod";
import { prisma } from "../../lib/prisma";
import { verifyToken } from "../token";
import { pubSub } from "../../utils/pub-sub";

export async function cherishComment(app: FastifyInstance) {
    app.put('/cherish/comment/:commentId', async (request, reply) => {
        const zCommentId = z.object({
            commentId: z.string().uuid(),
        })
        const zCommentQuery = z.object({
            userId: z.string(),
            token: z.string(),
        })
        const { commentId } = zCommentId.parse(request.params)
        const {  userId, token } = zCommentQuery.parse(request.query)
        const verifyedToken = verifyToken(token);
        if (!verifyedToken.valid) {
            return reply.status(400).send({ message: "Not authorized" });
        }
        await prisma.comment.update({
            where: {
                id: commentId,
                userId: userId,
            },
            data: {
                asfCoins: {
                    increment: 1,
                }
            }
        })
        pubSub.publish('asf', { action: "cherish", type: "comment", data: { commentId } })
        return reply.status(201).send();
    })
}