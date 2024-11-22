import { date, number } from "zod";

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

export type Comment = {
    id: string;
    content: string;
    asfCoins: number;
    createdAt: Date;
    postId: string;
    replies?: Comment[];
    parentCommentId?: string | null;
    user: User;
}

export type Post = {
    id: string;
    title: string;
    content: string;
    asfCoins: number;
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
