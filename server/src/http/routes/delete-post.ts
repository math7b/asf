import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { verifyToken } from "../token";
import { postsPubSub } from "../../utils/posts-pub-sub";

export async function deletePost(app: FastifyInstance) {
    app.delete('/post/:postId', async (request, reply) => {
        const zPostId = z.object({
            postId: z.string(),
        })
        const zPostBody = z.object({
            userId: z.string(),
            token: z.string(),
        })
        const { postId } = zPostId.parse(request.params)
        const { userId, token } = zPostBody.parse(request.query)
        const verifiedToken = verifyToken(token);
        if (!verifiedToken.valid) {
            return reply.status(400).send({ message: "Not authorized" });
        }
        if (!postId) {
            return reply.status(400).send({ message: "Error deleting the post" });
        }
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
        postsPubSub.publish('asf', { action: 'delete', type: 'post', data: { id: postId, userId } })
        return reply.status(201).send()
    })
}