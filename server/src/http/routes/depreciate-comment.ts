import { FastifyInstance } from "fastify";
import z from "zod";
import { prisma } from "../../lib/prisma";

export async function depreciateComment(app: FastifyInstance) {
    app.post('/depreciate/comment/:commentId', async (request, reply) => {
        const cherishCommentParams = z.object({
            commentId: z.string().uuid(),
        })

        const { commentId } = cherishCommentParams.parse(request.params)

        const comment = await prisma.comment.update({
            where: {
                id: commentId,
            },
            data: {
                asfCoins: {
                    decrement: 1,
                }
            }
        })

        return reply.status(201).send({ comment });
    })
}