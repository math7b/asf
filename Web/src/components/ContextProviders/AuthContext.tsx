import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AuthContextType, LoggedUser, Posts } from '../../interfaces';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [loggedUser, setLoggedUser] = useState<LoggedUser | null>(null);
    const [token, setToken] = useState<string>('');

    const login = (data: { Data: any; Token: string }) => {
        console.log("Login data:", data.Data); // Log the data to see its structure

        setIsLoggedIn(true);
        setLoggedUser(data.Data);
        setToken(data.Token);
    };

    const logout = () => {
        setIsLoggedIn(false);
        setLoggedUser(null);
        setToken('');
    };

    const addPostToLoggedUser = (newPost: Posts) => {
        console.log({
            newPostUserId: newPost.user.id,
            loggedUser: loggedUser?.id
        })
        if (newPost.user.id !== loggedUser?.id)
            return
        try {
            setLoggedUser(prevUser => {
                if (!prevUser) return null;
                return {
                    ...prevUser,
                    posts: [newPost, ...(prevUser.posts ?? [])],
                };
            });
        } catch (error) {
            console.log(error);

        }
    };

    const deletePostToLoggedUser = (postId: string, userId: string) => {
        if (userId !== loggedUser?.id)
            return
        try {
            setLoggedUser(prevUser => {
                if (!prevUser || !prevUser.posts) return prevUser;
                return {
                    ...prevUser,
                    posts: prevUser.posts.filter(post => post.id !== postId),
                };
            });
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <AuthContext.Provider value={{
            isLoggedIn,
            loggedUser,
            setLoggedUser,
            token,
            login,
            logout,
            addPostToLoggedUser,
            deletePostToLoggedUser
        }}>
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
