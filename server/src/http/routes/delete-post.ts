import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";

export async function deletePost(app: FastifyInstance) {
    app.post('/delete/post/:postId', async (request, reply) => {
        const deletePost = z.object({
            postId: z.string().uuid(),
        })
        const { postId } = deletePost.parse(request.params)
        const comments = await prisma.comment.deleteMany({
            where: {
                postId: postId,
            }
        })
        const post = await prisma.post.delete({
            where: {
                id: postId,
            }
        })
        return reply.status(201).send({ Post: post })
    })
}