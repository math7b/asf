import cors from '@fastify/cors'
import { fastify } from 'fastify'
import websocket from '@fastify/websocket'

import { cherishComment } from './routes/cherish-comment'
import { cherishPost } from './routes/cherish-post'
import { createComment } from './routes/create-comment'
import { createPost } from './routes/create-post'
import { createSubComment } from './routes/create-subcomment'
import { deleteComment } from './routes/delete-comment'
import { deletePost } from './routes/delete-post'
import { depreciateComment } from './routes/depreciate-comment'
import { depreciatePost } from './routes/depreciate-post'
import { getComment } from './routes/get-comment'
import { getComments } from './routes/get-comments'
import { getPost } from './routes/get-post'
import { getPosts } from './routes/get-posts'
import { createUser } from './routes/create-user'
import { createBeeKeeper } from './routes/create-beeKeeper'
import { logon } from './routes/user-logon'
import { postRoutes } from './ws/posts-real-time'
import { getUser } from './routes/get-user'

const app = fastify()
app.register(websocket)
app.register(cors)

app.register(getPost)
app.register(getPosts)
app.register(getComments)
app.register(getComment)
app.register(createPost)
app.register(createComment)
app.register(createSubComment)
app.register(createUser)
app.register(createBeeKeeper)
app.register(deletePost)
app.register(deleteComment)
app.register(cherishPost)
app.register(cherishComment)
app.register(depreciatePost)
app.register(depreciateComment)
app.register(logon)
app.register(getUser)

app.register(postRoutes)

const port = 3333;
app.listen({ host: '0.0.0.0', port: port }).then(() => {
    console.log({ Message: 'HTTP Server running!', Port: port })
})
