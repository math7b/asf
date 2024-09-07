import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";

export async function createUser(app: FastifyInstance){
    app.post('/create/user', async (request, reply) =>{
        const createUser = z.object({
            name: z.string(),
            email: z.string(),
            password: z.string(),
        })
        const {name, email, password} = createUser.parse(request.body)
        const asfCoins = 0
        const promCoins = 0
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password,
                asfCoins,
                promCoins,
            }
        })
        return reply.status(201).send()
    })
}