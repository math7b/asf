import { Blockquote } from '@tiptap/extension-blockquote';
import { BulletList } from '@tiptap/extension-bullet-list';
import Code from '@tiptap/extension-code';
import { Link as LinkExtension } from '@tiptap/extension-link';
import { OrderedList } from '@tiptap/extension-ordered-list';
import Strike from '@tiptap/extension-strike';
import { TextAlign } from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import { Underline } from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale/pt-BR';
import { CaretDown, CaretUp, Trash } from 'phosphor-react';
import React, { FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usePosts } from '../../components/PostContext';
import { Toolbar } from '../../components/ToolBar';
import { Comment } from '../../interfaces';
import api from '../../services/api';
import { Container, StyledPost } from "../../styles/global";
import { Content, CreateComment, CreateReplay, DeleteButton, EditorBar, Info, Title, VoteButton, Votes } from './styles';

export default function PostDetails() {
    const userId = JSON.parse(localStorage.getItem("LoggedUserId") || "null");
    const isLoggedIn = localStorage.getItem("LoggedStatus");
    const token = JSON.parse(localStorage.getItem("Token") || "null");
    const { post, loading, error, fetchPostById } = usePosts();
    const [openReplyBoxId, setOpenReplyBoxId] = useState<string | null>(null);
    const [replyContents, setReplyContents] = useState<{ [key: string]: string }>({});
    const { postId } = useParams<{ postId?: string }>();
    const navigate = useNavigate();


    const [isReplying, setIsReplying] = useState(false);


    const mainEditor = useEditor({
        extensions: [
            StarterKit,
            TextStyle,
            Strike,
            Code,
            LinkExtension,
            Blockquote,
            BulletList,
            OrderedList,
            Underline,
            TextAlign.configure({
                types: ['paragraph', 'heading'],
            }),
        ],
        content: '',
        onUpdate: ({ editor }) => {
            const content = editor.getHTML();
            if (openReplyBoxId) {
                handleReplyContentChange(openReplyBoxId, content);
            }
        },
    });


    const replyEditor = useEditor({
        extensions: [
            StarterKit,
            TextStyle,
            Strike,
            Code,
            LinkExtension,
            Blockquote,
            BulletList,
            OrderedList,
            Underline,
            TextAlign.configure({
                types: ['paragraph', 'heading'],
            }),
        ],
        content: '',
    });

    useEffect(() => {
        if (postId) {
            fetchPostById(postId);
        }
    }, [postId]);

    useEffect(() => {
        if (error) {
            console.error("Error loading post details.");
            alert("Error loading post details.");
        }
    }, [error]);

    if (loading) return <h1>Loading...</h1>;

    const toggleAnswerBox = (commentId: string) => {
        setOpenReplyBoxId(openReplyBoxId === commentId ? null : commentId);
        if (openReplyBoxId !== commentId) {
            const replyContent = replyContents[commentId] || '';
            replyEditor?.commands.setContent(replyContent);
            setIsReplying(true);
        } else {
            setIsReplying(false);
        }
    };

    const handleReplyContentChange = (commentId: string, content: string) => {
        setReplyContents((prevContents) => ({
            ...prevContents,
            [commentId]: content,
        }));
    };

    async function handleCherishPost(event: React.MouseEvent) {
        event.preventDefault();
        try {
            await api.put(`/cherish/post/${postId}`, {}, { params: { userId, token } });
        } catch (error: any) {
            console.error('Error cherishing post:', error);
            alert(error.response.data.message);
        }
    }

    async function handleCherishComment(event: React.MouseEvent, commentId: string) {
        event.preventDefault();
        try {
            await api.put(`/cherish/comment/${commentId}`, {}, { params: { userId, token } });
        } catch (error: any) {
            console.error('Error cherishing comment:', error);
            alert(error.response.data.message);
        }
    }

    async function handleDepreciatePost(event: React.MouseEvent) {
        event.preventDefault();
        try {
            await api.put(`/depreciate/post/${postId}`, {}, { params: { userId, token } });
        } catch (error: any) {
            console.error('Error depreciating post:', error);
            alert(error.response.data.message);
        }
    }

    async function handleDepreciateComment(event: React.MouseEvent, commentId: string) {
        event.preventDefault();
        try {
            await api.put(`/depreciate/comment/${commentId}`, {}, { params: { userId, token } });
        } catch (error: any) {
            console.error('Error depreciating comment:', error);
            alert(error.response.data.message);
        }
    }

    async function handlePostDelete(event: React.MouseEvent) {
        event.preventDefault();
        try {
            await api.delete(`/post/${postId}`, { params: { userId, token } });
            navigate('../home');
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    }

    async function handleCommentDelete(event: React.MouseEvent, commentId: string) {
        event.preventDefault();
        try {
            await api.delete(`/comment/${commentId}`, { params: { userId, token } });
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    }

    async function handleNewCommentCreate(event: FormEvent) {
        event.preventDefault();
        try {
            if (!isLoggedIn || !token) {
                localStorage.clear();
                alert(`Fantasmas não podem criar conteudos.`);
                navigate('/login');
                return;
            }
            const content = mainEditor?.getHTML();
            await api.post('/comment', { content, postId, userId, token });
            mainEditor?.commands.clearContent();
        } catch (error: any) {
            alert(error.response.data.message);
        }
    }

    async function handleNewReplyCreate(event: FormEvent, parentCommentId: string | null) {
        event.preventDefault();
        if (!isLoggedIn || !token) {
            localStorage.clear();
            alert(`Fantasmas não podem criar conteudos.`);
            navigate('/login');
            return;
        }

        if (parentCommentId === null) {
            alert("Erro: ID do comentário pai é inválido.");
            return;
        }

        const content = replyEditor?.getHTML();
        if (!content) {
            alert("Erro: Não foi possível obter o conteúdo da resposta.");
            return;
        }

        try {
            await api.post('/comment/sub', { content, postId, parentCommentId, userId, token });
            setOpenReplyBoxId(null);
            replyEditor?.commands.clearContent();
            setIsReplying(false);
        } catch (error) {
            console.error('Error posting reply:', error);
            alert('Erro ao enviar a resposta. Tente novamente.');
        }
    }

    const renderComments = (comments: Comment[]) => {
        return comments.map(comment => (
            <StyledPost key={comment.id}>
                <Votes>
                    <VoteButton onClick={(e) => {
                        if (!userId || comment.user.id === userId) return;
                        handleCherishComment(e, comment.id);
                    }} disabled={!userId || comment.user.id === userId}>
                        <CaretUp size={20} />
                    </VoteButton>
                    <p>{comment.value}</p>
                    <VoteButton onClick={(e) => {
                        if (!userId || comment.user.id === userId) return;
                        handleDepreciateComment(e, comment.id);
                    }} disabled={!userId || comment.user.id === userId}>
                        <CaretDown size={20} />
                    </VoteButton>
                </Votes>
                <Content>
                    <Info>
                        <div>
                            <p>{comment.user.name}</p>
                            <time>{formatDistanceToNow(comment.createdAt, { locale: ptBR, addSuffix: true })}</time>
                        </div>
                        <DeleteButton onClick={(e) => {
                            if (!userId || comment.user.id !== userId) return;
                            handleCommentDelete(e, comment.id);
                        }} disabled={!userId || comment.user.id !== userId}>
                            <Trash size={16} />
                        </DeleteButton>
                    </Info>
                    <Content dangerouslySetInnerHTML={{ __html: comment.content || "" }} />
                    {openReplyBoxId === comment.id && (
                        <CreateReplay onSubmit={(e) => handleNewReplyCreate(e, comment.id)}>
                            <EditorBar>
                                <Toolbar editor={replyEditor} />
                                <EditorContent editor={replyEditor} />
                            </EditorBar>
                            <footer>
                                <button type="submit">Enviar</button>
                                <button type="button" onClick={() => toggleAnswerBox(comment.id)}>Cancelar</button>
                            </footer>
                        </CreateReplay>
                    )}
                    {openReplyBoxId !== comment.id && (
                        <button onClick={() => toggleAnswerBox(comment.id)}>
                            {openReplyBoxId === comment.id ? 'Cancelar' : 'Responder'}
                        </button>
                    )}
                    {comment.replies && renderComments(comment.replies)}
                </Content>
            </StyledPost>
        ));
    };

    return (
        <Container>
            <StyledPost key={post?.id}>
                <Votes>
                    <VoteButton onClick={(e) => {
                        if (!userId || post?.userId === userId) return;
                        handleCherishPost(e);
                    }} disabled={!userId || post?.userId === userId}>
                        <CaretUp size={20} />
                    </VoteButton>
                    <p>{post?.value}</p>
                    <VoteButton onClick={(e) => {
                        if (!userId || post?.userId === userId) return;
                        handleDepreciatePost(e);
                    }} disabled={!userId || post?.userId === userId}>
                        <CaretDown size={20} />
                    </VoteButton>
                </Votes>
                <Content>
                    <Info>
                        <div>
                            <p>{post?.user.name}</p>
                            <time>{post ? formatDistanceToNow(post.createdAt, { locale: ptBR, addSuffix: true }) : 'Date not available'}</time>
                        </div>
                        <DeleteButton onClick={(e) => {
                            if (!userId || post?.userId !== userId) return;
                            handlePostDelete(e);
                        }} disabled={!userId || post?.userId !== userId}>
                            <Trash size={16} />
                        </DeleteButton>
                    </Info>
                    <Title>{post?.title}</Title>
                    <Content dangerouslySetInnerHTML={{ __html: post?.content || "" }} />
                </Content>
            </StyledPost>
            <CreateComment onSubmit={handleNewCommentCreate}>
                <strong>Deixe um comentário</strong>
                <EditorBar>
                    <Toolbar editor={mainEditor} />
                    <EditorContent editor={mainEditor} />
                </EditorBar>
                <footer>
                    <button type="submit">Enviar</button>
                </footer>
            </CreateComment>
            {post?.comments && renderComments(post.comments)}
        </Container>
    );
}
