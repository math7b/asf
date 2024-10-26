import { FastifyInstance } from "fastify";
import z from "zod";
import { prisma } from "../../lib/prisma";
import { verifyToken } from "../token";
import { pubSub } from "../../utils/pub-sub";

export async function cherishPost(app: FastifyInstance) {
    app.put('/cherish/post/:postId', async (request, reply) => {
        const zPostId = z.object({
            postId: z.string(),
        })
        const zPostQuery = z.object({
            userId: z.string(),
            token: z.string(),
        })
        const { postId } = zPostId.parse(request.params)
        const { userId, token } = zPostQuery.parse(request.query)
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
        pubSub.publish('asf', { action: "cherish", type: "post", data: { postId } })
        return reply.status(201).send();
    })
}