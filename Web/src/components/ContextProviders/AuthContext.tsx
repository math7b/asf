import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
    id: string;
    email: string;
    name: string;

}

interface BeeKeeper {
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
    user: User;
}

export interface Posts {
    id: string;
    title: string;
    content: string;
    asfCoins: number;
    asfCash: number;
    createdAt: string;
    option: string;
    comments: Comment[];
    user: User;
}

export interface UserData {
    asfCash: number;
    asfCoins: number;
    beeKeeper: BeeKeeper;
    comments: Comment[];
    email: string;
    id: string;
    name: string;
    posts: Posts[];
    registeredAt: string;
}

interface AuthContextType {
    isLoggedIn: boolean;
    userData: UserData | null;
    setUserData: (data: UserData | null) => void;
    token: string;
    login: (data: { Data: any; Token: string }) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [userData, setUserData] = useState<UserData | null>(null);
    const [token, setToken] = useState<string>('');

    const login = (data: { Data: any; Token: string }) => {
        setIsLoggedIn(true);
        setUserData(data.Data);
        setToken(data.Token);
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUserData(null);
        setToken('');
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, userData, token, login, logout, setUserData }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
