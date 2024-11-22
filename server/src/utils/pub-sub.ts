
export type BeeKeeper = {
    id: string;
    city: string;
    phoneNumber: string;
    RG: string;
    CPF: string;
    subscriptionAt: Date;
    userId: string;
};

export type User = {
    id: string;
    name: string;
    email: string;
    state: string;
    registeredAt: Date;
    beeKeeper?: BeeKeeper | null;
};

export type LoggedUser = {
    id: string;
    name: string;
    email: string;
    state: string;
    asfCoins: number,
    asfCash: number,
    registeredAt: Date;
    beeKeeper?: BeeKeeper | null;
};

export type Comment = {
    id: string;
    content: string;
    value: number;
    createdAt: Date;
    postId: string | null; // postId is optional, so it can be null
    replies?: Comment[];   // replies are optional, a comment may or may not have replies
    parentCommentId?: string | null; // parentCommentId is optional, can be null
    userId: string; // userId is required (always associated with a user)
    user: User; // user is required and is associated with a User
    post?: Post | null; // post is optional and can be null
    parentComment?: Comment | null; // parentComment is optional and can be null
};

export type Post = {
    id: string;
    title: string;
    content: string;
    value: number;
    createdAt: Date;
    option: string;
    comments?: Comment[];
    user: User;
};

export type Message = {
    action: 'create' | 'delete' | 'cherish' | 'depreciate';
    type: 'post' | 'comment';
    data: {
        post?: {},
        postId?: string,
        comment?: {},
        commentId?: string,
        commentCreator?: string,
        userId?: string,
    };
};
export type Subscriber = (message: Message) => void;

class PubSub {
    private channels: Record<string, Subscriber[]> = {};

    subscribe(channel: string, subscriber: Subscriber) {
        if (!this.channels[channel]) {
            this.channels[channel] = [];
        }
        this.channels[channel].push(subscriber);
    }

    publish(channel: string, message: Message) {
        if (!this.channels[channel]) {
            return;
        }
        for (const subscriber of this.channels[channel]) {
            subscriber(message);
        }
    }
}

export const pubSub = new PubSub();
