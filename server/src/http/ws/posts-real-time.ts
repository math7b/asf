import { FastifyInstance } from "fastify";
import { pubSub } from "../../utils/pub-sub";

export async function postRoutes(app: FastifyInstance) {
    app.get('/posts/results', { websocket: true }, (connection) => {
        pubSub.subscribe('asf', (message) => {
            connection.send(JSON.stringify(message));
        });
    });
}
