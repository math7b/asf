import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { verifyToken } from "../token";
import { postsPubSub } from "../../utils/posts-pub-sub";

export async function createSubComment(app: FastifyInstance) {
    app.post('/comment/sub', async (request, reply) => {
        const createCommentBody = z.object({
            content: z.string(),
            postId: z.string(),
            parentCommentId: z.string().optional(),
            userId: z.string(),
            token: z.string(),
        });
        const { content, postId, parentCommentId, userId, token } = createCommentBody.parse(request.body);
        const verifiedToken = verifyToken(token);
        if (!verifiedToken.valid) {
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
            data.parentComment = {
                connect: {
                    id: parentCommentId,
                },
            };
        }
        const subCommentCreate = await prisma.comment.create({
            data,
        });
        const id = subCommentCreate.id;
        const subComment = await prisma.comment.findUnique({
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
        if (!subComment) {
            return reply.status(404).send({ message: "Sub comment not found" });
        }
        postsPubSub.publish('asf', { action: 'create', type: 'comment', data: subComment })
        return reply.status(201).send();
    });
}
