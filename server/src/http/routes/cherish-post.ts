import { FastifyInstance } from "fastify";
import z from "zod";
import { prisma } from "../../lib/prisma";
import { verifyToken } from "../token";

export async function cherishPost(app: FastifyInstance) {
    app.post('/cherish/post/:postId', async (request, reply) => {
        const cherishPostParams = z.object({
            postId: z.string(),
            userId: z.string(),
            token: z.string(),
        })

        const { postId } = cherishPostParams.parse(request.params)
        const { userId, token } = cherishPostParams.parse(request.body)
        const verifyedToken = verifyToken(token);
        if (!verifyedToken.valid) {
            return reply.status(400).send({ message: "Not authorized" });
        }

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