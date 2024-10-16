import { FastifyInstance } from "fastify";
import z from "zod";
import { prisma } from "../../lib/prisma";

interface Comment {
    id: string;
    content: string;
    asfCoins: number;
    createdAt: Date;
    postId: string;
    parentCommentId: string | null;
    replies?: Comment[];
}

interface Post {
    id: string;
    title: string;
    content: string;
    asfCoins: number;
    createdAt: Date;
    option: string;
    comments: Comment[];
}

export async function getPost(app: FastifyInstance) {
    app.get('/posts/:postId', async (request, reply) => {
        const getPostParams = z.object({
            postId: z.string().uuid(),
        })

        const { postId } = getPostParams.parse(request.params)

        const post: Post | null = await prisma.post.findUnique({
            where: {
                id: postId,
            },
            include: {
                comments: {}
            }
        })

        if (!post) {
            throw new Error("Post not found")
        }

        const orderedComments = organizeComments(post.comments)

        const orderedPost = {
            ...post,
            comments: orderedComments
        }

        return reply.status(201).send(orderedPost)
    })
}

function organizeComments(comments: Comment[]): Comment[] {
    const commentMap: { [id: string]: Comment } = {}
    const rootComments: Comment[] = []

    // Create a map of comments using their IDs as keys
    comments.forEach(comment => {
        commentMap[comment.id] = comment
    })

    comments.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    
    // Organize comments into hierarchical structure
    comments.forEach(comment => {
        if (comment.parentCommentId !== null) {
            const parentComment = commentMap[comment.parentCommentId]
            if (parentComment) {
                if (!parentComment.replies) {
                    parentComment.replies = []
                }
                parentComment.replies.push(comment)
            }
        } else {
            rootComments.push(comment)
        }
    })

    return rootComments
}
