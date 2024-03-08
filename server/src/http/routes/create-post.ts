import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";

export async function createPost(app: FastifyInstance) {
    app.post('/create/post', async (request, reply) => {
        const createPost = z.object({
            title: z.string(),
            content: z.string(),
            option: z.string(),
        })
        const {title, content, option} = createPost.parse(request.body)
        const asfCoins = 3
        const post = await prisma.post.create({
            data: {
                title,
                content,
                asfCoins,
                option,
            }
        })
        return reply.status(201).send({Post: post})
    })
}