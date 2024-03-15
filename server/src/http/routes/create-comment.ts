import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";

export async function createComment(app: FastifyInstance) {
    app.post('/create/comment', async (request, reply) => {
        const createCommentBody = z.object({
            content: z.string(),
            postId: z.string(),
        })
        const { content, postId } = createCommentBody.parse(request.body)
        const asfCoins = 2
        const comment = await prisma.comment.create({
            data: {
                content,
                asfCoins,
                postId,
            }
        })
        return reply.status(201).send({ Comment: comment })
    })
}