import React, { ChangeEvent, FormEvent, InvalidEvent, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale/pt-BR';
import { usePosts } from '../../components/ContextProviders/PostContext';
import { Posts, Comment } from '../../interfaces';
import { CaretDown, CaretUp, Trash } from 'phosphor-react';
import api from '../../services/api';
import { useAuth } from '../../components/ContextProviders/AuthContext';
import { Container, Post } from "../../styles/global";
import { Content, CreateComment, CreateReplay, Info, Title, Votes } from './styles';

export default function PostDetails() {
    const { isLoggedIn, loggedUser, logout, token } = useAuth();
    const {
        loading,
        error,
        fetchPostById,
        cherishPost,
        cherishComment,
        depreciateComment,
        depreciatePost,
    } = usePosts();

    const [post, setPost,] = useState<Posts | null>(null);
    const [newComment, setNewComment] = useState<string>('');
    const [newReply, setNewReply] = useState<{ [key: string]: string }>({});
    const [openReplyBoxId, setOpenReplyBoxId] = useState<string | null>(null);

    const { postId } = useParams<{ postId?: string }>();
    const userId = loggedUser?.id;
    const navigate = useNavigate();
    useEffect(() => {
        const loadPost = async () => {
            if (postId) {
                const fetchedPost = await fetchPostById(postId);
                setPost(fetchedPost);
            }
        };
        loadPost();
    }, [postId]);

    if (loading) return <h1>Loading...</h1>;
    if (error) return <h1>{error}</h1>;
    async function handleCherishPost(event: React.MouseEvent) {
        event.preventDefault();
        try {
            if (postId && userId) {
                await cherishPost(postId, userId, token);
            } else {
                alert("Connectse primeiro");
                navigate('../../login');
            }
        } catch (error) {
            console.error('Error cherishing post:', error);
        }
    }
    async function handleCherishComment(event: React.MouseEvent, commentId: string) {
        event.preventDefault;
        try {
            if (userId) {
                await cherishComment(commentId, userId, token);
            } else {
                alert("Connectse primeiro");
                navigate('../../login');
            }
        } catch (error) {
            console.error('Error cherishing comment:', error);
        }
    }

    async function handleDepreciatePost(event: React.MouseEvent) {
        event.preventDefault();
        try {
            if (postId && userId) {
                await depreciatePost(postId, userId, token);
            } else {
                alert("Connectse primeiro");
                navigate('../../login');
            }
        } catch (error) {
            console.error('Error depreciating post:', error);
        }
    }
    async function handleDepreciateComment(event: React.MouseEvent, commentId: string) {
        event.preventDefault;
        try {
            if (userId) {
                await depreciateComment(commentId, userId, token);
            } else {
                alert("Connectse primeiro");
                navigate('../../login');
            }
        } catch (error) {
            console.error('Error depreciating comment:', error);
        }
    }

    async function handlePostDelete(event: React.MouseEvent) {
        event.preventDefault;
        try {
            await api.delete(`post/${postId}`, {
                params: { userId, token }
            });
            navigate('../home')
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };
    async function handleNewCommentCreate(event: FormEvent) {
        event.preventDefault();
        if (!isLoggedIn || !token) {
            logout();
            alert(`Fantasmas não podem criar conteudos.`);
            navigate('/login');
            return;
        }
        const content = newComment;
        await api.post('/comment', { content, postId, userId, token });
        setNewComment('');
        if (postId) {
            const updatedPost = await fetchPostById(postId);
            setPost(updatedPost); // Update the local state
        }
    };
    function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('');
        setNewComment(event.target.value);
    };
    function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('Esse campo é obrigatório');
    };

    async function handleReplyDelete(event: React.MouseEvent, commentId: string) {
        event.preventDefault();
        try {
            await api.delete(`/comment/${commentId}`, {
                params: { userId, token }
            });
            if (postId) {
                const updatedPost = await fetchPostById(postId);
                setPost(updatedPost);
            }
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    };
    async function handleNewReplyCreate(event: FormEvent, parentCommentId: string | null) {
        event.preventDefault();
        if (!isLoggedIn || !token) {
            logout();
            alert(`Fantasmas não podem criar conteudos.`);
            navigate('/login');
            return;
        }
        const content = newReply[parentCommentId || ''];
        await api.post('/comment/sub', { content, postId, parentCommentId, userId, token });
        if (postId) {
            const updatedPost = await fetchPostById(postId);
            setPost(updatedPost);
        }
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
            <>
                <Post key={post?.id}>
                    <Votes>
                        <span onClick={(e) => handleCherishPost(e)}><CaretUp size={20} /></span>
                        <p>{post?.asfCoins}</p>
                        <span onClick={(e) => handleDepreciatePost(e)}>
                            <CaretDown size={20} />
                        </span>
                        <div></div>
                    </Votes>
                    <Content>
                        <Info>
                            <div>
                                <p>Matheus Barth</p>
                                <time>{post ?
                                    formatDistanceToNow(post.createdAt, {
                                        locale: ptBR,
                                        addSuffix: true
                                    }
                                    ) : 'Date not available'}</time>
                            </div>
                            <span onClick={(e) => handlePostDelete(e)}><Trash size={16} /></span>
                        </Info>
                        <Title>
                            {post?.title}
                        </Title>
                        <Content>
                            {post?.content}
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
            {post?.comments && renderComments(post.comments)}
        </Container>
    );
}