import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { CaretDown, CaretUp, Trash } from "phosphor-react";
import React, {
    ChangeEvent, FormEvent, InvalidEvent, useEffect, useState
} from "react";
import api from "../../services/api";
import {
    Content, CreateComment, CreateReplay, Info, Titulo,
    Votes
} from "./styles";

import { Container, Post } from "../../styles/global";
import { useAuth, Comment, Posts } from "../../components/ContextProviders/AuthContext";

export default function PostDetails() {
    const [postDetails, setPostDetails] = useState<Posts>();
    const [newComment, setNewComment] = useState('')
    const [newReply, setNewReply] = useState<{ [key: string]: string }>({});
    const { userData, token } = useAuth();
    const userId = userData?.id

    const [openReplyBoxId, setOpenReplyBoxId] = useState<string | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);

    const url = window.location.pathname;
    const postId = url.substring(url.lastIndexOf('/') + 1);

    useEffect(() => {
        fetchPostDetails();
    }, []);

    const fetchPostDetails = async () => {
        try {
            const response = await api.get<Posts>(`/posts/${postId}`);
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

    async function handleCherishComment(
        event: React.MouseEvent,
        commentId: string
    ) {
        event.preventDefault;
        await api.post(`/cherish/comment/${commentId}`, { userId, token });
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
        const response = await api.post('/create/comment', { content, postId, userId });
        const createdComment = response.data.Comment;

        setPostDetails(prev => {
            const updatedPost = prev ? { ...prev } : {
                id: '', // Provide default values for all required fields
                title: '',
                content: '',
                asfCoins: 0,
                asfCash: 0,
                createdAt: new Date().toISOString(), // or any default date
                option: '',
                comments: [],
                user: { id: '', name: '' } // Provide a default User structure
            };

            return {
                ...updatedPost,
                comments: [...updatedPost.comments, createdComment],
            } as Posts; // Ensure to cast to Posts type
        });
        setNewComment('');
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
        const response = await api.post('/create/comment/sub', { content: newText, postId, parentCommentId, userId });
        const createdSubComment = response.data.SubComment;

        setPostDetails(prev => {
            const updatedPost: Posts = prev ? { ...prev } : {
                id: '',
                title: '',
                content: '',
                asfCoins: 0,
                asfCash: 0,
                createdAt: new Date().toISOString(),
                option: '',
                comments: [],
                user: { id: '', name: '', email: '' }, // Include email here
            };

            const updatedComments = updatedPost.comments.map(comment => {
                if (comment.id === parentCommentId) {
                    return {
                        ...comment,
                        replies: [...(comment.replies || []), createdSubComment],
                    };
                }
                return comment;
            });

            return { ...updatedPost, comments: updatedComments };
        });

        setNewReply(prevState => ({ ...prevState, [parentCommentId || '']: '' }));
        setOpenReplyBoxId(null);
    }
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
                                    formatDistanceToNow(comment.createdAt, {
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