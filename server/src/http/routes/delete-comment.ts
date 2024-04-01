import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";

export async function deleteComment(app: FastifyInstance) {
    app.post('/delete/comment/:commentId', async (request, reply) => {
        const deleteComment = z.object({
            commentId: z.string().uuid(),
        })
        const { commentId } = deleteComment.parse(request.params)
        const comments = await prisma.comment.deleteMany({
            where: {
                parentCommentId: commentId,
            }
        })
        await prisma.comment.delete({
            where: {
                id: commentId,
            }
        })
        return reply.status(201).send()
    })
}