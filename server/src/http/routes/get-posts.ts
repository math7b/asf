import z from "zod";
import { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma";
import { PostMessage, postsPubSub, Subscriber } from "../../utils/posts-pub-sub";

export async function getPosts(app: FastifyInstance) {
    app.get('/posts', async (request, reply) => {
        const posts = await prisma.post.findMany({
            orderBy: {
                createdAt: "desc",
            }
        })
        return reply.status(201).send(posts)
    })
}