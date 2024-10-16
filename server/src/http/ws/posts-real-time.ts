import z from "zod";
import { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma";
import { PostMessage, postsPubSub, Subscriber } from "../../utils/posts-pub-sub";

export async function postRoutes(app: FastifyInstance) {
    app.get('/posts/results', { websocket: true }, (connection) => {
        postsPubSub.subscribe('asf', (message) => {
            connection.send(JSON.stringify(message));
        });
    });
}
