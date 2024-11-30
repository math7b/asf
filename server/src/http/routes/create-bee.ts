import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { Bee, pubSub } from "../../utils/pub-sub";

export async function createBee(app: FastifyInstance) {
    app.post('/bee', async (request, reply) => {
        const createBeeSchema = z.object({
            name: z.string(),
            binomialNomenclature: z.string(),
        });
        const { name, binomialNomenclature } = createBeeSchema.parse(request.body);
        const bee: Bee | null = await prisma.bee.create({
            data: {
                name: name,
                binomialNomenclature: binomialNomenclature
            }
        })
        pubSub.publish('beedata', { action: 'create', type: 'bee', data: { bee } })
        return reply.status(201).send();
    });
}
