import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";

export async function createUser(app: FastifyInstance) {
    app.post('/create/user', async (request, reply) => {
        const createUser = z.object({
            name: z.string(),
            email: z.string(),
            password: z.string(),
        })
        const { name, email, password } = createUser.parse(request.body)
        await prisma.user.create({
            data: {
                name,
                email,
                password,
                asfCoins: 0,
                promCoins: 0,
            }
        })
        return reply.status(201).send()
    })
}