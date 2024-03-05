import { fastify } from 'fastify'
import { getPost } from './routes/get-post'

const app = fastify()

app.register(getPost)

app.listen({ port: 3333 }).then(() => {
    console.log('HTTP Server running!')
})