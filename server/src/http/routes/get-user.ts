import z from "zod"
import { verifyToken } from "../token"
import { FastifyInstance } from "fastify"
import { prisma } from "../../lib/prisma"
import { decrypt } from "../encrypt"
import { User } from "../../utils/pub-sub"

export async function getUser(app: FastifyInstance) {
    app.get('/user', async (request, reply) => {
        const getToken = z.object({
            token: z.string(),
        })
        const { token } = getToken.parse(request.query)
        const verifyedToken = verifyToken(token)
        console.log(verifyedToken)
        if (!verifyedToken.valid) {
            return reply.status(400).send({ message: "Not authorized" });
        }
        const userId = verifyedToken.decoded?.id
        console.log(userId)
        const data: User | null = await prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                id: true,
                name: true,
                email: true,
                password: false,
                state: true,
                asfCoins: true,
                asfCash: true,
                registeredAt: true,
                beeKeeper: true,
            }
        })
        if (!data) {
            return reply.status(400).send({ message: "Usuario não encontrado com os dados do token" });
        }
        const getUserIV = await prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                iv: true
            }
        })
        if (!getUserIV) {
            return reply.status(400).send({ message: "Usuario não posue uma chave de verificação" });
        }
        if (data.beeKeeper) {
            data.beeKeeper = {
                ...data.beeKeeper,
                city: decrypt(data.beeKeeper.city, getUserIV.iv),
                phoneNumber: decrypt(data.beeKeeper.phoneNumber, getUserIV.iv),
                RG: decrypt(data.beeKeeper.RG, getUserIV.iv),
                CPF: decrypt(data.beeKeeper.CPF, getUserIV.iv),
            };
        }
        return reply.status(200).send({
            Data: data
        })
    })
}