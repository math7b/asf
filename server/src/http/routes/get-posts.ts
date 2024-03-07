import z from "zod";
import { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma";

export async function getPosts(app: FastifyInstance) {
    app.get('/posts', async (request, reply) => {
        const posts = await prisma.post.findMany({})
        return reply.status(201).send({ Posts: posts })
    })
}