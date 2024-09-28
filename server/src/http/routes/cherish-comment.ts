import { FastifyInstance } from "fastify";
import z from "zod";
import { prisma } from "../../lib/prisma";
import { verifyToken } from "../token";

export async function cherishComment(app: FastifyInstance) {
    app.post('/cherish/comment/:commentId', async (request, reply) => {
        const cherishCommentParams = z.object({
            commentId: z.string().uuid(),
            userId: z.string(),
            token: z.string(),
        })

        const { commentId } = cherishCommentParams.parse(request.params)
        const {  userId, token } = cherishCommentParams.parse(request.body)
        const verifyedToken = verifyToken(token);
        if (!verifyedToken.valid) {
            return reply.status(400).send({ message: "Not authorized" });
        }

        await prisma.comment.update({
            where: {
                id: commentId,
                userId: userId,
            },
            data: {
                asfCoins: {
                    increment: 1,
                }
            }
        })

        return reply.status(201).send();
    })
}