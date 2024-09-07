import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { connect } from "net";

export async function createSubComment(app: FastifyInstance) {
    app.post('/create/comment/sub', async (request, reply) => {
        const createCommentBody = z.object({
            content: z.string(),
            postId: z.string(),
            parentCommentId: z.string().optional(),
            userId: z.string(),
        })
        const { content, postId, parentCommentId, userId } = createCommentBody.parse(request.body)
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

        await prisma.comment.create({
            data,
        });

        return reply.status(201).send()
    })
}