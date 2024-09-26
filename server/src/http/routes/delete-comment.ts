import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";

export async function deleteComment(app: FastifyInstance) {
    app.post('/delete/comment/:commentId', async (request, reply) => {
        const deleteComment = z.object({
            commentId: z.string(),
            userId: z.string(),
        })
        const { commentId, userId } = deleteComment.parse(request.params)
        await prisma.comment.deleteMany({
            where: {
                parentCommentId: commentId,
                userId: userId,
            },
        })
        await prisma.comment.delete({
            where: {
                id: commentId,
                userId: userId,
            },
        })
        return reply.status(201).send()
    })
}