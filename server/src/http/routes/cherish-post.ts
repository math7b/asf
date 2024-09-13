import { FastifyInstance } from "fastify";
import z from "zod";
import { prisma } from "../../lib/prisma";

export async function cherishPost(app: FastifyInstance) {
    app.post('/cherish/post/:postId', async (request, reply) => {
        const cherishPostParams = z.object({
            postId: z.string(),
            userId: z.string(),
        })

        const { postId, userId } = cherishPostParams.parse(request.params)

        await prisma.post.update({
            where: {
                id: postId,
                userId: userId,
            },
            data: {
                asfCoins: {
                    increment: 1,
                },
            },
        })

        return reply.status(201).send();
    })
}