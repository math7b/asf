import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale/pt-BR';
import { CaretDown, CaretUp, Trash } from 'phosphor-react';
import React, { ChangeEvent, FormEvent, InvalidEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usePosts } from '../../components/PostContext';
import { Comment } from '../../interfaces';
import api from '../../services/api';
import { Container, StyledPost } from "../../styles/global";
import { Content, CreateComment, CreateReplay, DeleteButton, Info, Title, VoteButton, Votes } from './styles';

export default function PostDetails() {
    const userId = JSON.parse(localStorage.getItem("LoggedUserId") || "null");
    const isLoggedIn = localStorage.getItem("LoggedStatus");
    const token = JSON.parse(localStorage.getItem("Token") || "null");
    const {
        post, loading, error, fetchPostById
    } = usePosts();
    const [newComment, setNewComment] = useState<string>('');
    const [newReply, setNewReply] = useState<{ [key: string]: string }>({});
    const [openReplyBoxId, setOpenReplyBoxId] = useState<string | null>(null);

    const { postId } = useParams<{ postId?: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        if (postId) {
            fetchPostById(postId)
        }
    }, [])

    useEffect(() => {
        const loadPost = async () => {
            if (postId) {
                await fetchPostById(postId);
            }
        };
        loadPost();
    }, [postId]);

    useEffect(() => {
        if (error) {
            console.log("Error loading post details.");
            alert("Error loading post details.");
        }
    }, [error]);
    if (loading) return <h1>Loading...</h1>;


    async function handleCherishPost(event: React.MouseEvent) {
        event.preventDefault();
        try {
            await api.put(`/cherish/post/${postId}`, {}, {
                params: { userId, token }
            });
        } catch (error: any) {
            console.error('Error cherishing post:', error);
            alert(error.response.data.message);
        }
    }
    async function handleCherishComment(event: React.MouseEvent, commentId: string) {
        event.preventDefault();
        try {
            await api.put(`/cherish/comment/${commentId}`, {}, {
                params: { userId, token }
            })
        } catch (error: any) {
            console.error('Error cherishing comment:', error);
            alert(error.response.data.message);
        }
    }

    async function handleDepreciatePost(event: React.MouseEvent) {
        event.preventDefault();
        try {
            await api.put(`depreciate/post/${postId}`, {}, {
                params: { userId, token }
            })
        } catch (error: any) {
            console.error('Error depreciating post:', error);
            alert(error.response.data.message);
        }
    }
    async function handleDepreciateComment(event: React.MouseEvent, commentId: string) {
        event.preventDefault();
        try {
            await api.put(`depreciate/comment/${commentId}`, {}, {
                params: { userId, token }
            })
        } catch (error: any) {
            console.error('Error depreciating comment:', error);
            alert(error.response.data.message);
        }
    }

    async function handlePostDelete(event: React.MouseEvent) {
        event.preventDefault();
        try {
            await api.delete(`post/${postId}`, {
                params: { userId, token }
            });
            navigate('../home')
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };
    async function handleCommentDelete(event: React.MouseEvent, commentId: string) {
        event.preventDefault();
        try {
            await api.delete(`/comment/${commentId}`, {
                params: { userId, token }
            });
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    };

    async function handleNewCommentCreate(event: FormEvent) {
        event.preventDefault();
        if (!isLoggedIn || !token) {
            localStorage.clear();
            alert(`Fantasmas não podem criar conteudos.`);
            navigate('/login');
            return;
        }
        const content = newComment;
        await api.post('/comment', { content, postId, userId, token });
        setNewComment('');
    };
    function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('');
        setNewComment(event.target.value);
    };
    function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('Esse campo é obrigatório');
    };

    async function handleNewReplyCreate(event: FormEvent, parentCommentId: string | null) {
        event.preventDefault();
        if (!isLoggedIn || !token) {
            localStorage.clear();
            alert(`Fantasmas não podem criar conteudos.`);
            navigate('/login');
            return;
        }
        const content = newReply[parentCommentId || ''];
        await api.post('/comment/sub', { content, postId, parentCommentId, userId, token });
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
                <StyledPost key={comment.id}>
                    <Votes>
                        <VoteButton onClick={(e) => {
                            if (!userId || comment.user.id === userId) return;
                            handleCherishComment(e, comment.id)
                        }}
                            disabled={!userId || comment.user.id === userId}
                        >
                            <CaretUp size={20} />
                        </VoteButton>
                        <p>{comment.value}</p>
                        <VoteButton onClick={(e) => {
                            if (!userId || comment.user.id === userId) return;
                            handleDepreciateComment(e, comment.id)
                        }}
                            disabled={!userId || comment.user.id === userId}
                        >
                            <CaretDown size={20} />
                        </VoteButton>
                        <div></div>
                    </Votes>
                    <Content>
                        <Info>
                            <div>
                                <p>{comment.user.name}</p>
                                <time>{
                                    formatDistanceToNow(comment.createdAt, {
                                        locale: ptBR,
                                        addSuffix: true,
                                    })
                                }</time>
                            </div>
                            <DeleteButton onClick={(e) => {
                                if (!userId || comment.user.id !== userId) return;
                                handleCommentDelete(e, comment.id)
                            }}
                                disabled={!userId || comment.user.id !== userId}
                            >
                                <Trash size={16} />
                            </DeleteButton>
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
                </StyledPost>
            ))
        );
    };

    return (
        <Container>
            <>
                <StyledPost key={post?.id}>
                    <Votes>
                        <VoteButton onClick={(e) => {
                            if (!userId || post?.userId === userId) return;
                            handleCherishPost(e)
                        }}
                            disabled={!userId || post?.userId === userId}
                        >
                            <CaretUp size={20} />
                        </VoteButton>
                        <p>{post?.value}</p>
                        <VoteButton onClick={(e) => {
                            if (!userId || post?.userId === userId) return;
                            handleDepreciatePost(e)
                        }}
                            disabled={!userId || post?.userId === userId}
                        >
                            <CaretDown size={20} />
                        </VoteButton>
                        <div></div>
                    </Votes>
                    <Content>
                        <Info>
                            <div>
                                <p>{post?.user.name}</p>
                                <time>{post ?
                                    formatDistanceToNow(post.createdAt, {
                                        locale: ptBR,
                                        addSuffix: true
                                    }
                                    ) : 'Date not available'}</time>
                            </div>
                            <DeleteButton onClick={(e) => {
                                if (!userId || post?.userId !== userId) return;
                                handlePostDelete(e)
                            }}
                                disabled={!userId || post?.userId !== userId}
                            >
                                <Trash size={16} />
                            </DeleteButton>
                        </Info>
                        <Title>
                            {post?.title}
                        </Title>
                        <Content>
                            {post?.content}
                        </Content>
                    </Content>
                </StyledPost>
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
            {post?.comments && renderComments(post.comments)}
        </Container>
    );
}