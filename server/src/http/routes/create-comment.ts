import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { connect } from "http2";
import { verifyToken } from "../token";

export async function createComment(app: FastifyInstance) {
    app.post('/create/comment', async (request, reply) => {
        const createCommentBody = z.object({
            content: z.string(),
            postId: z.string(),
            userId: z.string(),
            token: z.string(),
        })
        const { content, postId, userId, token } = createCommentBody.parse(request.body)
        const verifyedToken = verifyToken(token);
        if (!verifyedToken.valid) {
            return reply.status(400).send({ message: "Not authorized" });
        }
        const comment = await prisma.comment.create({
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
        return reply.status(201).send({Comment: comment})
    })
}