import z from "zod"
import { prisma } from "../../lib/prisma"
import { FastifyInstance } from "fastify"

export async function getPost(app: FastifyInstance) {
    app.get('/posts/:postId', async (request, reply) => {
        const getPostParams = z.object({
            postId: z.string().uuid(),
        })

        const { postId } = getPostParams.parse(request.params)

        const post = await prisma.post.findUnique({
            where: {
                id: postId,
            },
            include: {
                comments: {}
            }
        })
        return reply.status(201).send(post)
    })
}
