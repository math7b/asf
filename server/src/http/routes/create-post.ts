import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { verifyToken } from "../token";
import { Message, pubSub } from "../../utils/pub-sub";

export async function createPost(app: FastifyInstance) {
    app.post('/post', async (request, reply) => {
        const createPost = z.object({
            title: z.string(),
            content: z.string(),
            option: z.string(),
            userId: z.string(),
            token: z.string(),
        })
        const { title, content, option, userId, token } = createPost.parse(request.body)
        const verifyedToken = verifyToken(token);
        if (!verifyedToken.valid) {
            return reply.status(400).send({ message: "Not authorized" });
        }
        const postCreated = await prisma.post.create({
            data: {
                title,
                content,
                asfCoins: 3,
                option,
                user: {
                    connect: {
                        id: userId,
                    }
                },
            },
        })
        const id = postCreated.id;
        const post = await prisma.post.findUnique({
            where: {
                id: id
            },
            select: {
                id: true,
                title: true,
                content: true,
                asfCoins: true,
                createdAt: true,
                option: true,
                comments: true,
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
        });
        if (!post) {
            return reply.status(404).send({ message: "Post not found" });
        }
        pubSub.publish('asf', { action: 'create', type: 'post', data: { post } })
        return reply.status(201).send()
    })
}