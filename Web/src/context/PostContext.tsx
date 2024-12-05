import React, { createContext, useContext, useEffect, useState } from 'react';
import { Comment, Post, PostMessage, PostsContextType, SinglePost } from '../interfaces';
import api from '../services/api';

const PostsContext = createContext<PostsContextType | undefined>(undefined);

export const PostsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [post, setPost] = useState<SinglePost | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [fetchedPostIds, setFetchedPostIds] = useState<Set<string>>(new Set());

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const responsePostData = await api.get<Post[]>('/posts');
            setPosts(responsePostData.data);
        } catch (error) {
            setError('Failed to fetch posts.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
            const socket = new WebSocket('ws://localhost:3333/realtime/posts');
            socket.onopen = () => {
            console.log('WebSocket connection established with postContext');
        };
        socket.onmessage = (event) => {
            const message: PostMessage = JSON.parse(event.data);
            handleMessage(message);
        };
        socket.onerror = (error) => {
            console.error('postContext WebSocket error:', error);
        };
        socket.onclose = (event) => {
            console.log('WebSocket connection with postContext closed:', event);
        };
        return () => {
            socket.close();
        };
    }, []);

    const addCommentRecursively = (
        comments: Comment[], newComment: Comment, parentId: string
    ): Comment[] => {
        return comments.map((comment) => {
            if (comment.id === parentId) {
                return {
                    ...comment,
                    replies: [...(comment.replies || []), newComment],
                };
            }
            else if (comment.replies && comment.replies.length > 0) {
                return {
                    ...comment,
                    replies: addCommentRecursively(comment.replies, newComment, parentId),
                };
            }
            return comment;
        });
    };

    const handleMessage = (message: PostMessage) => {
        switch (message.action) {
            case 'create':
                if (message.type === 'post') {
                    const newPost = message.data.post as Post;
                    setPosts((prev) => [newPost, ...prev]);
                    if (post && post.id === newPost.id) {
                        setPost({ ...newPost });
                    }
                }
                if (message.type === 'comment') {
                    const newComment = message.data.comment as Comment;
                    const postId = newComment.postId;
                    const parentCommentId = newComment.parentCommentId;
                    setPosts((prevPosts) =>
                        prevPosts.map((post) => {
                            if (post.id === postId) {
                                if (parentCommentId) {
                                    return {
                                        ...post,
                                        comments: addCommentRecursively(post.comments || [], newComment, parentCommentId),
                                    };
                                } else {
                                    return {
                                        ...post,
                                        comments: [...(post.comments || []), newComment],
                                    };
                                }
                            }
                            return post;
                        })
                    );
                    setPost((prevPost) => {
                        if (prevPost) {
                            const updatedComments = parentCommentId ?
                                addCommentRecursively(prevPost.comments || [], newComment, parentCommentId) :
                                [...(prevPost.comments || []), newComment];

                            return { ...prevPost, comments: updatedComments };
                        }
                        return null;
                    });
                }
                break;
            case 'delete':
                if (message.type === 'post') {
                    setPosts((prev) => prev.filter((post) => post.id !== message.data.postId));
                }
                if (message.type === 'comment') {
                    const commentId = message.data.commentId;
                    if (!commentId) {
                        return
                    }
                    setPosts((prevPosts) => prevPosts.map((post) => ({
                        ...post,
                        comments: post.comments ?
                            post.comments.filter(
                                comment => comment.id !== commentId
                            ) : []
                    })));
                    setPost((prevPost) => {
                        if (!prevPost) return null;
                        const removeCommentRecursively = (comments: Comment[], commentId: string): Comment[] => {
                            return comments
                                .filter(comment => comment.id !== commentId)
                                .map(comment => ({
                                    ...comment,
                                    replies: removeCommentRecursively(comment.replies || [], commentId),
                                }));
                        };
                        const updatedComments = removeCommentRecursively(prevPost.comments || [], commentId);
                        return { ...prevPost, comments: updatedComments };
                    });
                }
                break;
            case 'cherish':
                if (message.type === 'post') {
                    const postId = message.data.postId;
                    setPosts((prevPosts) =>
                        prevPosts.map((post) =>
                            post.id === postId ? { ...post, value: post.value + 1 } : post
                        )
                    );
                    setPost((prevPost) => {
                        if (prevPost && prevPost.id === postId) {
                            return { ...prevPost, value: prevPost.value + 1 };
                        }
                        return prevPost;
                    });
                }
                if (message.type === 'comment') {
                    const commentId = message.data.commentId;
                    setPosts((prevPosts) =>
                        prevPosts.map((post) => ({
                            ...post,
                            comments: post.comments ? post.comments.map((comment) =>
                                comment.id === commentId ?
                                    { ...comment, value: comment.value + 1 } :
                                    comment
                            ) : [],
                        }))
                    );
                    setPost((prevPost) => {
                        if (prevPost) {
                            const updatedComments = prevPost.comments.map((comment) =>
                                comment.id === commentId ?
                                    { ...comment, value: comment.value + 1 } :
                                    comment
                            );
                            return { ...prevPost, comments: updatedComments };
                        }
                        return prevPost;
                    });
                }
                break;
            case 'depreciate':
                if (message.type === 'post') {
                    const postId = message.data.postId;
                    setPosts((prevPosts) =>
                        prevPosts.map((post) =>
                            post.id === postId ? { ...post, value: post.value - 1 } : post
                        )
                    );
                    setPost((prevPost) => {
                        if (prevPost && prevPost.id === postId) {
                            return { ...prevPost, value: prevPost.value - 1 };
                        }
                        return prevPost;
                    });
                }
                if (message.type === 'comment') {
                    const commentId = message.data.commentId;
                    setPosts((prevPosts) =>
                        prevPosts.map((post) => ({
                            ...post,
                            comments: post.comments ? post.comments.map((comment) =>
                                comment.id === commentId ? { ...comment, value: comment.value - 1 } : comment
                            ) : [],
                        }))
                    );
                    setPost((prevPost) => {
                        if (prevPost) {
                            const updatedComments = prevPost.comments.map((comment) =>
                                comment.id === commentId ? { ...comment, value: comment.value - 1 } : comment
                            );
                            return { ...prevPost, comments: updatedComments };
                        }
                        return prevPost;
                    });
                }
                break;
            default:
                console.warn('Unknown action type:', message.action);
                break;
        }
    };

    const fetchPostById = async (postId: string) => {
        setLoading(true);
        if (fetchedPostIds.has(postId)) {
            const existingPost = posts.find(post => post.id === postId);
            if (existingPost) {
                setPost(existingPost);
                setLoading(false);
            }
            return null;
        }
        try {
            const response = await api.get<Post>(`/posts/${postId}`);
            const fetchedPost = response.data;
            setPost(fetchedPost);
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
            setFetchedPostIds(prevIds => new Set(prevIds).add(postId));
            return fetchedPost;
        } catch (err) {
            console.error('Failed to fetch post by ID:', err);
            setError('Failed to fetch post by ID.');
            return null;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <PostsContext.Provider value={{
            posts,
            post,
            loading,
            error,
            fetchPosts,
            fetchPostById
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
