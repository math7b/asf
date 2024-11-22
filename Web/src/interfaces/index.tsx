export interface Comment {
    id: string;
    content: string;
    value: number;
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
    option: string;
    value: number;
    state?: string;
    createdAt: string;
    postId: string;
    comments: Comment[];
    user: UsersData;
    userId: string;
}

export interface SinglePost {
    id: string;
    title: string;
    content: string;
    option: string;
    value: number;
    state?: string;
    createdAt: string;
    postId: string;
    comments: Comment[];
    user: UsersData;
    userId: string;
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
    state: string;
    asfCash: number;
    asfCoins: number;
    registeredAt: string;
    beeKeeper: BeeKeeper | null;
    posts: Post[] | null;
    comments: Comment[] | null
}

export interface LoggonApi {
    Data: LoggedUser,
    Token: string,
    message: string
}

export interface NewUserRegister {
    UserId: string
}

export interface PostsContextType {
    posts: Post[];
    post: Post | null;
    loading: boolean;
    error: string | null;
    fetchPosts: () => Promise<void>;
    fetchPostById: (postId: string) => Promise<Post | null>;
}

export interface UserContextType {
    loggedUserData: LoggedUser | null;
    updateLoggedUserData: (data: LoggedUser) => void;
    logout: () => void;
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
        postId?: string,
        comment?: {},
        commentId?: string,
        commentCreator?: string,
        userId?: string,
    };
};

export interface UserMessage {
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
