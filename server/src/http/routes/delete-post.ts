import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";

export async function deletePost(app: FastifyInstance) {
    app.post('/delete/post/:postId', async (request, reply) => {
        const deletePost = z.object({
            postId: z.string(),
            userId: z.string(),
        })
        const { postId, userId } = deletePost.parse(request.params)
        await prisma.comment.deleteMany({
            where: {
                postId: postId,
                userId: userId,
            },
        })
        await prisma.post.delete({
            where: {
                id: postId,
                userId: userId,
            },
        })
        return reply.status(201).send()
    })
}