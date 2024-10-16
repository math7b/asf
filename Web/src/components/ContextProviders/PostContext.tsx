import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../../services/api';
import { Comment, PostMessage, Posts, PostsContextType } from '../../interfaces';
import { useAuth } from './AuthContext';

const PostsContext = createContext<PostsContextType | undefined>(undefined);

export const PostsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const {
        loggedUser,
        addPostToLoggedUser,
        deletePostToLoggedUser
    } = useAuth();

    const [posts, setPosts] = useState<Posts[]>([]);
    const [comment, setComment] = useState<Comment[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const response = await api.get<Posts[]>('/posts');
            setPosts(response.data);
        } catch (err) {
            setError('Failed to fetch posts.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:3333/posts/results');

        socket.onopen = () => {
            console.log('WebSocket connection established');
        };

        socket.onmessage = (event) => {
            const message: PostMessage = JSON.parse(event.data);
            handleMessage(message);
        };

        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        socket.onclose = (event) => {
            console.log('WebSocket connection closed:', event);
        };

        return () => {
            socket.close();
        };
    }, []);

    const handleMessage = (message: PostMessage) => {
        switch (message.action) {
            case 'create':
                if (message.type === 'post') {
                    const newPost = message.data as Posts;
                    setPosts((prev) => [newPost, ...prev]);
                    const post = message.data as Posts;
                    console.log(post)
                    addPostToLoggedUser(post)
                }
                if (message.type === 'comment') {
                    const postId = message.data.id;
                    const newComment = message.data as Comment;
                    const parentCommentId = newComment.parentCommentId;
                    setPosts((prevPosts) =>
                        prevPosts.map((post) => {
                            if (post.id === postId) {
                                if (parentCommentId) {
                                    const updatedComments = post.comments.map((comment) => {
                                        if (comment.id === parentCommentId) {
                                            return {
                                                ...comment,
                                                replies: [...(comment.replies || []), newComment]
                                            };
                                        }
                                        return comment;
                                    });
                                    return { ...post, comments: updatedComments };
                                } else {
                                    return {
                                        ...post,
                                        comments: [...(post.comments || []), newComment]
                                    };
                                }
                            }
                            return post;
                        })
                    );
                }
                break;
            case 'delete':
                if (message.type === 'post') {
                    setPosts((prev) => prev.filter((post) => post.id !== message.data.id));
                    const postId = message.data.id as string;
                    const userId = message.data.userId as string;
                    console.log({
                        A: postId,
                        B: userId
                    })
                    deletePostToLoggedUser(postId, userId)
                }
                if (message.type === 'comment') {
                    const commentId = message.data.id;
                    setPosts((prevPosts) => prevPosts.map((post) => ({
                        ...post,
                        comments: post.comments.filter(comment => comment.id !== commentId)
                    })));
                }
                break;
            default:
                console.warn('Unknown action type:', message.action);
                break;
        }
    };

    const fetchPostById = async (postId: string) => {
        setLoading(true);
        try {
            const response = await api.get<Posts>(`/posts/${postId}`);
            const fetchedPost = response.data;
            setPosts(prevPosts => {
                const existingPostIndex = prevPosts.findIndex(post => post.id === postId);
                if (existingPostIndex !== -1) {
                    return prevPosts.map(post =>
                        post.id === postId ? fetchedPost : post
                    );
                } else {
                    return [];
                }
            });
            return fetchedPost;
        } catch (err) {
            console.error('Failed to fetch post by ID:', err);
            setError('Failed to fetch post by ID.');
            return null;
        } finally {
            setLoading(false);
        }
    };

    const cherishPost = async (postId: string, userId: string, token: string) => {
        try {
            await api.post(`/cherish/post/${postId}`, { userId, token });

            setPosts(prevPosts =>
                prevPosts.map(post =>
                    post.id === postId ? { ...post, asfCoins: post.asfCoins + 1 } : post
                )
            );
        } catch (err) {
            console.error('Error cherishing post:', err);
            setError('Failed to cherish post.');
        }
    };

    const cherishComment = async (commentId: string, userId: string, token: string) => {
        try {
            await api.post(`/cherish/comment/${commentId}`, { userId, token });

            setComment(prevPosts =>
                prevPosts.map(comment =>
                    comment.id === commentId ? { ...comment, asfCoins: comment.asfCoins + 1 } : comment
                )
            );
        } catch (err) {
            console.error('Error cherishing post:', err);
            setError('Failed to cherish post.');
        }
    };

    const depreciatePost = async (postId: string, userId: string, token: string) => {
        try {
            await api.post(`/depreciate/post/${postId}`, { userId, token });

            setPosts(prevPosts =>
                prevPosts.map(post =>
                    post.id === postId ? { ...post, asfCoins: post.asfCoins - 1 } : post
                )
            );
        } catch (err) {
            console.error('Error depreciating post:', err);
            setError('Failed to depreciate post.');
        }
    };

    const depreciateComment = async (commentId: string, userId: string, token: string) => {
        try {
            await api.post(`/depreciate/comment/${commentId}`, { userId, token });

            setComment(prevPosts =>
                prevPosts.map(comment =>
                    comment.id === commentId ? { ...comment, asfCoins: comment.asfCoins - 1 } : comment
                )
            );
        } catch (err) {
            console.error('Error depreciating post:', err);
            setError('Failed to depreciate post.');
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <PostsContext.Provider value={{
            posts,
            loading,
            error,
            fetchPosts,
            fetchPostById,
            cherishPost,
            cherishComment,
            depreciatePost,
            depreciateComment
        }}>
            {children}
        </PostsContext.Provider>
    );
};

export const usePosts = () => {
    const context = useContext(PostsContext);
    if (!context) {
        throw new Error('usePosts must be used within a PostsProvider');
    }
    return context;
};
