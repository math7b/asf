import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { decrypt, encrypt } from "../encrypt";
import { generateToken, verifyToken } from "../token";

export async function logon(app: FastifyInstance) {
    app.post('/logon', async (request, reply) => {
        const logon = z.object({
            email: z.string(),
            password: z.string(),
        })
        const { email, password } = logon.parse(request.body)
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            }
        })
        if (!user) {
            return reply.status(400).send({ message: "Email or password incorrect!" });
        }
        const encryptedPassword = encrypt(password, user.iv)
        const data = await prisma.user.findUnique({
            where: {
                email: email,
                password: encryptedPassword,
            },
            select: {
                id: true,
                name: true,
                email: true,
                password: false,
                asfCoins: true,
                asfCash: true,
                registeredAt: true,
                beeKeeper: true,
                posts: {
                    orderBy: {
                        createdAt: "desc",
                    }
                },
                comments: {
                    where: {
                        userId: user.id,
                    },
                    orderBy: {
                        createdAt: "desc",
                    }
                }
            }
        })
        if (!data) {
            return reply.status(400).send({ message: "Email or password incorrect!" });
        }
        if (data.beeKeeper) {
            data.beeKeeper = {
                ...data.beeKeeper,
                state: decrypt(data.beeKeeper.state, user.iv),
                city: decrypt(data.beeKeeper.city, user.iv),
                phoneNumber: decrypt(data.beeKeeper.phoneNumber, user.iv),
                RG: decrypt(data.beeKeeper.RG, user.iv),
                CPF: decrypt(data.beeKeeper.CPF, user.iv),
            };
        }
        let beeKeeper = false;
        if (data.beeKeeper) {
            beeKeeper = true;
        }
        const newToken = generateToken(user.id, user.name, user.email, beeKeeper);
        return reply.status(201).send({
            Data: data,
            Token: newToken
        });
    })
}