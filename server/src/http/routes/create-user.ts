import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { newEncrypt } from "../encrypt";

export async function createUser(app: FastifyInstance) {
    app.post('/user', async (request, reply) => {
        const createUser = z.object({
            name: z.string(),
            email: z.string(),
            password: z.string(),
        })
        const { name, email, password } = createUser.parse(request.body)
        const {
            encryptedData: encryptedPassword,
            iv
        } = newEncrypt(password)
        await prisma.user.create({
            data: {
                iv: iv,
                name,
                email,
                password: encryptedPassword,
                asfCoins: 0,
                asfCash: 0,
            }
        })
        return reply.status(201).send()
    })
}