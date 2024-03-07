import { fastify } from 'fastify'
import { getPost } from './routes/get-post'
import { getPosts } from './routes/get-posts'
import { getComments } from './routes/get-comments'
import { getComment } from './routes/get-comment'

const app = fastify()

app.register(getPost)
app.register(getPosts)
app.register(getComments)
app.register(getComment)

app.listen({ port: 3333 }).then(() => {
    console.log('HTTP Server running!')
})