import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { connect } from "net";
import { verifyToken } from "../token";

export async function createSubComment(app: FastifyInstance) {
    app.post('/create/comment/sub', async (request, reply) => {
        const createCommentBody = z.object({
            content: z.string(),
            postId: z.string(),
            parentCommentId: z.string().optional(),
            userId: z.string(),
            token: z.string(),
        })
        const { content, postId, parentCommentId, userId, token } = createCommentBody.parse(request.body)
        const verifyedToken = verifyToken(token);
        if (!verifyedToken.valid) {
            return reply.status(400).send({ message: "Not authorized" });
        }
        const data: any = {
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
        };

        if (parentCommentId) {
            data.parentCommentId = parentCommentId;
        }

        const subComent = await prisma.comment.create({
            data,
        });

        return reply.status(201).send({ SubComment: subComent })
    })
}