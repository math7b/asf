import { FastifyInstance } from "fastify";
import z from "zod";
import { prisma } from "../../lib/prisma";

export async function cherishComment(app: FastifyInstance) {
    app.post('/cherish/comment/:commentId', async (request, reply) => {
        const cherishCommentParams = z.object({
            commentId: z.string().uuid(),
            userId: z.string(),
        })

        const { commentId, userId } = cherishCommentParams.parse(request.params)

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

        return reply.status(201).send();
    })
}