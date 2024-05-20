import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { CaretDown, CaretUp, Trash } from "phosphor-react";
import React, {
    ChangeEvent, FormEvent, InvalidEvent, useEffect, useState
} from "react";
import api from "../../services/api";
import { Posts } from "../Home";
import {
    Content, CreateComment, CreateReplay, Info, Titulo,
    Votes
} from "./styles";

import { Container, Post } from "../../styles/global";

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

    const [openReplyBoxId, setOpenReplyBoxId] = useState<string | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);

    const url = window.location.pathname;
    const postId = url.substring(url.lastIndexOf('/') + 1);

    useEffect(() => {
        try {
            api.get<PostDetails>(`/posts/${postId}`).then(response => {
                setPostDetails(response.data);
            });
        } catch (error) {
            console.error('Error fetching post:', error);
        }
    }, [openReplyBoxId]);

    useEffect(() => {
        if (postDetails) {
            setComments(postDetails.comments || []);
        }
    }, [postDetails]);

    const fetchPostDetails = async () => {
        try {
            const response = await api.get<PostDetails>(`/posts/${postId}`);
            setPostDetails(response.data);
        } catch (error) {
            console.error('Error fetching post details:', error);
        }
    };

    async function handleCherishPost(event: React.MouseEvent, postId: string) {
        event.preventDefault;
        await api.post(`/cherish/post/${postId}`);
        fetchPostDetails();
    }

    async function handleCherishComment(event: React.MouseEvent, commentId: string) {
        event.preventDefault;
        await api.post(`/cherish/comment/${commentId}`);
        fetchPostDetails();
    }

    async function handleDepreciatePost(event: React.MouseEvent, postId: string) {
        event.preventDefault;
        await api.post(`/depreciate/post/${postId}`);
        fetchPostDetails();
    }

    async function handleDepreciateComment(event: React.MouseEvent, commentId: string) {
        event.preventDefault;
        await api.post(`/depreciate/comment/${commentId}`);
        fetchPostDetails();
    }

    async function handlePostDelete(event: React.MouseEvent, postId: string) {
        event.preventDefault;
        await api.post(`/delete/post/${postId}`);
        fetchPostDetails();
        window.location.href = '/';
    };

    async function handleNewCommentCreate(event: FormEvent) {
        event.preventDefault();
        const content = newComment;
        await api.post('/create/comment', { content, postId })

        setNewComment('');
        fetchPostDetails();

        return true;
    };
    function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('');
        setNewComment(event.target.value);
    };
    function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('Esse campo é obrigatório');
    };

    async function handleReplyDelete(event: React.MouseEvent, commentId: string) {
        event.preventDefault;
        await api.post(`/delete/comment/${commentId}`);
        fetchPostDetails();
    };

    async function handleNewReplyCreate(event: FormEvent, parentCommentId: string | null) {
        event.preventDefault();
        const newText = newReply[parentCommentId || ''];
        setNewReply(prevState => ({
            ...prevState,
            [parentCommentId || '']: newText
        }));
        await api.post('/create/comment/sub', { content: newText, postId, parentCommentId })

        setNewReply(prevState => ({ ...prevState, [parentCommentId || '']: '' }));
        fetchPostDetails();
        setOpenReplyBoxId(null);

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

    const toggleAnswerBox = (commentId: string) => {
        setOpenReplyBoxId(openReplyBoxId === commentId ? null : commentId);
    };

    const renderComments = (comments: Comment[]) => {
        return (
            comments.map(comment => (
                <Post key={comment.id}>
                    <Votes>
                        <span onClick={(e) => handleCherishComment(e, comment.id)}>
                            <CaretUp size={20} />
                        </span>
                        <p>{comment.asfCoins}</p>
                        <span onClick={(e) => handleDepreciateComment(e, comment.id)}>
                            <CaretDown size={20} />
                        </span>
                        <div></div>
                    </Votes>
                    <Content>
                        <Info>
                            <div>
                                <p>Matheus Barth</p>
                                <time>{
                                    formatDistanceToNow(comment.createAt, {
                                        locale: ptBR,
                                        addSuffix: true,
                                    })
                                }</time>
                            </div>
                            <span onClick={(e) => handleReplyDelete(e, comment.id)}>
                                <Trash size={16} />
                            </span>
                        </Info>
                        {comment.content}
                        <CreateReplay onSubmit={(event) => handleNewReplyCreate(event, comment.id)}>
                            {openReplyBoxId === comment.id && (
                                <div>
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
                                        <button onClick={() => toggleAnswerBox(comment.id)}>
                                            Cancelar
                                        </button>
                                        <button type="submit">Enviar</button>
                                    </footer>
                                </div>
                            )}
                            {openReplyBoxId !== comment.id && (
                                <button onClick={() => toggleAnswerBox(comment.id)}>Responder</button>
                            )}
                        </CreateReplay>
                        {comment.replies && comment.replies.length > 0 && renderComments(comment.replies)}
                    </Content>
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
                            <span onClick={(e) => handleCherishPost(e, postDetails.id)}><CaretUp size={20} /></span>
                            <p>{postDetails.asfCoins}</p>
                            <span onClick={(e) => handleDepreciatePost(e, postDetails.id)}>
                                <CaretDown size={20} />
                            </span>
                            <div></div>
                        </Votes>
                        <Content>
                            <Info>
                                <div>
                                    <p>Matheus Barth</p>
                                    <time>{
                                        formatDistanceToNow(postDetails.createdAt, {
                                            locale: ptBR,
                                            addSuffix: true,
                                        })
                                    }</time>
                                </div>
                                <span onClick={(e) => handlePostDelete(e, postDetails.id)}><Trash size={16} /></span>
                            </Info>
                            <Titulo>
                                {postDetails.title}
                            </Titulo>
                            <Content>
                                {postDetails.content}
                            </Content>
                        </Content>
                    </Post>
                    <CreateComment onSubmit={handleNewCommentCreate}>
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
                <h1>loading or missing Post.</h1>
            )}
            {postDetails?.comments && renderComments(postDetails.comments)}
        </Container>
    );
}