import { fastify } from 'fastify'
import { getPost } from './routes/get-post'
import { getPosts } from './routes/get-posts'
import { getComments } from './routes/get-comments'
import { getComment } from './routes/get-comment'
import { createPost } from './routes/create-post'
import { createComment } from './routes/create-comment'
import { createSubComment } from './routes/create-subcomment'
import { deletePost } from './routes/delete-post'
import { deleteComment } from './routes/delete-comment'

const app = fastify()

app.register(getPost)
app.register(getPosts)
app.register(getComments)
app.register(getComment)
app.register(createPost)
app.register(createComment)
app.register(createSubComment)
app.register(deletePost)
app.register(deleteComment)

app.listen({ port: 3333 }).then(() => {
    console.log('HTTP Server running!')
})