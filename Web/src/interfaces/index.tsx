export interface BeeKeeper {
    id: string;
    state: string;
    city: string;
    phoneNumber: string;
    RG: string;
}

export interface Comment {
    id: string;
    content: string;
    asfCoins: number;
    createdAt: string;
    postId: string;
    replies?: Comment[];
    parentCommentId?: string;
    user: UserData;
}

export interface Posts {
    id: string;
    title: string;
    content: string;
    asfCoins: number;
    createdAt: string;
    option: string;
    comments: Comment[];
    user: UserData;
}

export interface LoggedUser {
    id: string;
    name: string;
    email: string;
    asfCash: number;
    asfCoins: number;
    registeredAt: string;
    posts: Posts[] | [];
    beeKeeper: BeeKeeper;
}

export interface UserData {
    id: string;
    name: string;
    email: string;
    registeredAt: string;
    posts?: Posts[];
    beeKeeper: BeeKeeper;
}

export interface AuthContextType {
    isLoggedIn: boolean;
    loggedUser: LoggedUser | null;
    setLoggedUser: (data: LoggedUser | null) => void;
    login: (data: { Data: any; Token: string }) => void;
    logout: () => void;
    token: string;
    addPostToLoggedUser: (newPost: Posts) => void;
    deletePostToLoggedUser: (postId: string, userId: string) => void;
}

export interface PostsContextType {
    posts: Posts[];
    loading: boolean;
    error: string | null;
    fetchPosts: () => Promise<void>;
    fetchPostById: (postId: string) => Promise<Posts | null>;
    cherishPost: (postId: string, userId: string, token: string) => Promise<void>;
    cherishComment: (commentId: string, userId: string, token: string) => Promise<void>;
    depreciatePost: (postId: string, userId: string, token: string) => Promise<void>;
    depreciateComment: (commentId: string, userId: string, token: string) => Promise<void>;
}

export interface PostsState {
    posts: Posts[];
    loading: boolean;
    error: string | null;
}

export type PostMessage = {
    action: 'create' | 'delete';
    type: 'post' | 'comment' | 'id';
    data: {
        post?: Posts,
        comment?: Comment,
        id?: string,
        userId?: string,
        user?: UserData
    };
};
