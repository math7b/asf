import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { connect } from "http2";

export async function createBeeKeeper(app: FastifyInstance) {
    app.post('/create/beekeepr', async (request, reply) => {
        const createUser = z.object({
            state: z.string(),
            city: z.string(),
            phoneNumber: z.string(),
            RG: z.string(),
            CPF: z.string(),
            userId: z.string(),
        })
        const {
            state, city, phoneNumber, RG, CPF, userId
        } = createUser.parse(request.body)
        await prisma.beeKeeper.create({
            data: {
                state,
                city,
                phoneNumber,
                RG,
                CPF,
                user: {
                    connect: {
                        id: userId
                    },
                },
            },
        })
        return reply.status(201).send()
    })
}