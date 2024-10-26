import { FastifyInstance } from "fastify";
import z from "zod";
import { prisma } from "../../lib/prisma";
import { verifyToken } from "../token";
import { pubSub } from "../../utils/pub-sub";

export async function depreciateComment(app: FastifyInstance) {
    app.put('/depreciate/comment/:commentId', async (request, reply) => {
        const zCommentId = z.object({
            commentId: z.string().uuid(),
        })
        const zCommentQuery = z.object({
            userId: z.string(),
            token: z.string(),
        })
        const { commentId } = zCommentId.parse(request.params)
        const { userId, token } = zCommentQuery.parse(request.query)
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
                    decrement: 1,
                },
            },
        })
        pubSub.publish('asf', { action: "depreciate", type: "comment", data: { commentId } })
        return reply.status(201).send();
    })
}