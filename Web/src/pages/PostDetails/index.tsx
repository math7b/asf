import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { CaretDown, CaretUp } from "phosphor-react";
import {
    ChangeEvent, FormEvent, InvalidEvent, useEffect, useState
} from "react";
import api from "../../services/api";
import { Posts } from "../Home";
import {
    Container, Content, CreateComment, Info, Post, Titulo, Votes
} from "./styles";

interface PostDetails extends Posts {
    comments: Comment[];
}

interface Comment {
    id: string;
    content: string;
    asfCoins: number;
    createAt: Date;
    postId: string;
    parentCommentId: string | null;
    replies: Comment[];
}

export default function PostDetails() {
    const [postDetails, setPostDetails] = useState<PostDetails>();
    const [newComment, setNewComment] = useState('')
    const [newReply, setNewReply] = useState<{ [key: string]: string }>({});

    const url = window.location.pathname;
    const postId = url.substring(url.lastIndexOf('/') + 1);

    useEffect(() => {
        api.get<PostDetails>(`/posts/${postId}`).then(response => {
            setPostDetails(response.data);
        });
    }, [handleCreateNewComment]);

    async function handleCreateNewComment(event: FormEvent) {
        event.preventDefault();
        const content = newComment;
        await api.post('/create/comment', { content, postId })
        return true;
    };
    function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('');
        setNewComment(event.target.value);
    };
    function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('Esse campo é obrigatório');
    };

    async function handleCreateNewReply(event: FormEvent, parentCommentId: string | null) {
        event.preventDefault();
        const newText = newReply[parentCommentId || ''];
        setNewReply(prevState => ({
            ...prevState,
            [parentCommentId || '']: newText
        }));
        await api.post('/create/comment/sub', { content: newText, postId, parentCommentId })
        return true;
    };
    function handleNewReplyChange(event: ChangeEvent<HTMLTextAreaElement>, commentId: string) {
        event.target.setCustomValidity('');
        setNewReply(prevState => ({
            ...prevState,
            [commentId]: event.target.value
        }));
    };
    function handleNewReplyInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('Esse campo é obrigatório');
    };


    const renderComments = (comments: Comment[]) => {
        return (
            comments.map(comment => (
                <Post key={comment.id}>
                    <Votes>
                        <span><CaretUp size={20} /></span>
                        <p>{comment.asfCoins}</p>
                        <span><CaretDown size={20} /></span>
                        <div></div>
                    </Votes>
                    <div>
                        <Info>
                            <p>{comment.asfCoins}</p>
                            <p>Matheus Barth</p>
                            <time>{
                                formatDistanceToNow(comment.createAt, {
                                    locale: ptBR,
                                    addSuffix: true,
                                })
                            }</time>
                        </Info>
                        <p>{comment.content}</p>
                        <CreateComment onSubmit={(event) => handleCreateNewReply(event, comment.id)}>
                            <strong>Deixe um comentário</strong>
                            <textarea
                                name="reply"
                                placeholder="Deixe um comentário"
                                value={newReply[comment.id] || ""}
                                onChange={(event) => handleNewReplyChange(event, comment.id)}
                                onInvalid={handleNewReplyInvalid}
                                required
                            ></textarea>
                            <footer>
                                <button type="submit">Responder</button>
                            </footer>
                        </CreateComment>
                        {comment.replies && comment.replies.length > 0 && renderComments(comment.replies)}
                    </div>
                </Post>
            ))
        );
    };

    return (
        <Container>
            {postDetails ? (
                <>
                    <Post key={postDetails.id}>
                        <Votes>
                            <span><CaretUp size={20} /></span>
                            <p>{postDetails.asfCoins}</p>
                            <span><CaretDown size={20} /></span>
                            <div></div>
                        </Votes>
                        <div>
                            <Info>
                                <p>{postDetails.asfCoins}</p>
                                <p>Matheus Barth</p>
                                <time>{
                                    formatDistanceToNow(postDetails.createdAt, {
                                        locale: ptBR,
                                        addSuffix: true,
                                    })
                                }</time>
                            </Info>
                            <Titulo>
                                {postDetails.title}
                            </Titulo>
                            <Content>
                                {postDetails.content}
                            </Content>
                        </div>
                    </Post>
                    <CreateComment onSubmit={handleCreateNewComment}>
                        <strong>Deixe um comentário</strong>
                        <textarea
                            name="comment"
                            placeholder="Deixe um comentário"
                            value={newComment}
                            onChange={handleNewCommentChange}
                            onInvalid={handleNewCommentInvalid}
                            required
                        ></textarea>
                        <footer>
                            <button type="submit">Responder</button>
                        </footer>
                    </CreateComment>
                </>
            ) : (
                <h1>loading...</h1>
            )}
            {postDetails?.comments && renderComments(postDetails.comments)}
        </Container>
    );
}