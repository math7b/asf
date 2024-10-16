import { FastifyInstance } from "fastify";
import { any, z } from "zod";
import { prisma } from "../../lib/prisma";
import { connect } from "http2";
import { verifyToken } from "../token";
import { postsPubSub } from "../../utils/posts-pub-sub";

export async function createComment(app: FastifyInstance) {
    app.post('/comment', async (request, reply) => {
        const createCommentBody = z.object({
            content: z.string(),
            postId: z.string(),
            userId: z.string(),
            token: z.string(),
        })
        const { content, postId, userId, token } = createCommentBody.parse(request.body)
        const verifyedToken = verifyToken(token);
        if (verifyedToken.valid == false) {
            return reply.status(400).send({ message: "Not authorized" });
        }
        const commentCreated = await prisma.comment.create({
            data: {
                content,
                asfCoins: 2,
                post: {
                    connect: {
                        id: postId,
                    },
                },
                user: {
                    connect: {
                        id: userId,
                    },
                },
            }
        })
        const id = commentCreated.id;
        const comment = await prisma.comment.findUnique({
            where: {
                id: id,
            },
            select: {
                id: true,
                content: true,
                asfCoins: true,
                createdAt: true,
                postId: true,
                replies: true,
                parentCommentId: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        registeredAt: true,
                        beeKeeper: true,
                    }
                },
            }
        })
        if (!comment) {
            return reply.status(404).send({ message: "Comment not found" });
        }
        postsPubSub.publish('asf', { action: 'create', type: 'comment', data: comment })
        return reply.status(201).send()
    })
}