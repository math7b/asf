type BeeKeeper = {
    id: string;
    state: string;
    city: string;
    phoneNumber: string;
    RG: string;
};

type User = {
    id: string;
    name: string;
    email: string;
    registeredAt: string;
    beeKeeper: BeeKeeper;
};

type Comment = {
    id: string;
    content: string;
    asfCoins: number;
    createdAt: string;
    postId: string;
    replies?: Comment[];
    parentCommentId?: string;
    user: User;
}

type Post = {
    id: string;
    title: string;
    content: string;
    asfCoins: number;
    createdAt: string;
    option: string;
    comments?: Comment[];
    user: User;
};

export type PostMessage = {
    action: 'create' | 'delete';
    type: 'post' | 'comment';
    data: {
        post?: Post,
        comment?: Comment,
        id?: string,
        userId?: string
    };
};
export type Subscriber = (message: PostMessage) => void;

class PostsPubSub {
    private channels: Record<string, Subscriber[]> = {};

    subscribe(channel: string, subscriber: Subscriber) {
        if (!this.channels[channel]) {
            this.channels[channel] = [];
        }
        this.channels[channel].push(subscriber);
    }

    publish(channel: string, message: PostMessage) {
        if (!this.channels[channel]) {
            return;
        }
        for (const subscriber of this.channels[channel]) {
            subscriber(message);
        }
    }
}

export const postsPubSub = new PostsPubSub();
