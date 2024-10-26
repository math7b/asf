import { FastifyInstance } from "fastify";
import z from "zod";
import { prisma } from "../../lib/prisma";
import { verifyToken } from "../token";
import { pubSub } from "../../utils/pub-sub";

export async function depreciatePost(app: FastifyInstance) {
    app.put('/depreciate/post/:postId', async (request, reply) => {
        const zPostId = z.object({
            postId: z.string().uuid(),
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
                    decrement: 1,
                },
            },
        })
        pubSub.publish('asf', { action: "depreciate", type: "post", data: { postId } })
        return reply.status(201).send();
    })
}