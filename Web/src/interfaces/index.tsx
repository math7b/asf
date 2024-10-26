export interface Comment {
    id: string;
    content: string;
    asfCoins: number;
    createdAt: string;
    postId: string;
    replies?: Comment[];
    parentCommentId?: string;
    user: UsersData;
}

export interface Post {
    id: string;
    title: string;
    content: string;
    asfCoins: number;
    createdAt: string;
    postId: string;
    option: string;
    comments: Comment[];
    user: UsersData;
}

export interface BeeKeeper {
    id: string;
    state: string;
    city: string;
    phoneNumber: string;
    RG: string;
}

export interface UsersData {
    id: string;
    name: string;
    email: string;
    registeredAt: string;
    posts?: Post[];
    beeKeeper: BeeKeeper;
}

export interface LoggedUser {
    id: string;
    name: string;
    email: string;
    asfCash: number;
    asfCoins: number;
    registeredAt: string;
    beeKeeper: BeeKeeper;
    posts: Post[];
    comments: Comment
}

export interface LoggonApi {
    Data: LoggedUser,
    Token: string
}

export interface PostsContextType {
    posts: Post[];
    post: Post | null;
    loading: boolean;
    error: string | null;
    fetchPosts: () => Promise<void>;
    fetchPostById: (postId: string) => Promise<Post | null>;
}

export interface PostsState {
    posts: Post[];
    loading: boolean;
    error: string | null;
}

export interface PostMessage {
    action: 'create' | 'delete' | 'cherish' | 'depreciate';
    type: 'post' | 'comment' | 'id';
    data: {
        post?: {},
        comment?: {},
        postId?: string,
        commentId?: string,
        userId?: string
    };
};
