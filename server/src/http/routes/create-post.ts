import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { verifyToken } from "../token";

export async function createPost(app: FastifyInstance) {
    app.post('/create/post', async (request, reply) => {
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
        const post = await prisma.post.create({
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
        return reply.status(201).send({Post: post})
    })
}