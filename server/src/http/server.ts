import { fastify } from 'fastify'
import { getPost } from './routes/get-post'
import { getPosts } from './routes/get-posts'

const app = fastify()

app.register(getPost)
app.register(getPosts)

app.listen({ port: 3333 }).then(() => {
    console.log('HTTP Server running!')
})