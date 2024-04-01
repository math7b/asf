import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";

export async function createSubComment(app: FastifyInstance) {
    app.post('/create/comment/sub', async (request, reply) => {
        const createCommentBody = z.object({
            content: z.string(),
            postId: z.string(),
            parentCommentId: z.string(),
        })
        const { content, postId, parentCommentId } = createCommentBody.parse(request.body)
        const asfCoins = 2
        await prisma.comment.create({
            data: {
                content,
                asfCoins,
                postId,
                parentCommentId,
            }
        })
        return reply.status(201).send()
    })
}