import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { verifyToken } from "../token";

export async function deleteBee(app: FastifyInstance) {
    app.delete('/bee/:beeId', async (request, reply) => {
        // Validate input
        const zBeeId = z.object({
            beeId: z.string(),
        });
        const zBeeBody = z.object({
            userId: z.string(),
            token: z.string(),
        });

        // Parse request data
        const { beeId } = zBeeId.parse(request.params);
        const { userId, token } = zBeeBody.parse(request.query);

        // Verify token
        const verifiedToken = verifyToken(token);
        if (!verifiedToken.valid) {
            return reply.status(400).send({ message: "Não autorizado" });
        }

        // Ensure beeId is provided
        if (!beeId) {
            return reply.status(400).send({ message: "Id da abelha não encontrado" });
        }

        try {
            // Delete associated beeData if it exists
            await prisma.beeData.deleteMany({
                where: {
                    beeId: beeId, // Delete beeData related to the given beeId
                },
            });

            // Delete the bee
            await prisma.bee.delete({
                where: {
                    id: beeId,
                },
            });

            // Return a success response
            return reply.status(201).send();
        } catch (error) {
            console.error("Error deleting bee data or bee:", error);
            return reply.status(500).send({ message: "Erro ao excluir a abelha ou seus dados" });
        }
    });
}
