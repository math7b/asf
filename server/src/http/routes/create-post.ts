import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";

export async function createPost(app: FastifyInstance) {
    app.post('/create/post', async (request, reply) => {
        const createPost = z.object({
            title: z.string(),
            content: z.string(),
            option: z.string(),
            userId: z.string(),
        })
        const { title, content, option, userId } = createPost.parse(request.body)
        await prisma.post.create({
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
            }
        })
        return reply.status(201).send()
    })
}