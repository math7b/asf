import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';
import { Comment, PostMessage, LoggedUser, UserMessage, UserContextType } from '../interfaces';
import { usePosts } from './PostContext';

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const token = JSON.parse(localStorage.getItem("Token") || "null");

    const [loggedUserData, setLoggedUserData] = useState<LoggedUser | null>(null)
    const [userSocket, setUserSocket] = useState<WebSocket | null>(null);

    const fetchLoggedUser = async () => {
        if (token) {
            try {
                const responseUserData = await api.get('/user', {
                    params: { token }
                });
                const loggedUser = responseUserData.data.Data as LoggedUser
                setLoggedUserData(loggedUser);
            } catch (error) {
                console.log('Failed to fetch user.', error);
            }
        }
    };

    useEffect(() => {
        if (loggedUserData) {
            const userId = loggedUserData.id;
            const socket = new WebSocket(`ws://localhost:3333/realtime/user/${userId}`);
            socket.onopen = () => {
                console.log('WebSocket connection established, userContext');
            };
            socket.onmessage = (event) => {
                const message: UserMessage = JSON.parse(event.data);
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
                setUserSocket(null);
            };
        } else {
            if (userSocket) {
                userSocket.close();
                setUserSocket(null);
            }
        }
    }, [loggedUserData]);

    const handleMessage = (message: PostMessage) => {
        switch (message.action) {
            case 'create':
                const userId = message.data.userId
                if (loggedUserData?.id === userId) {
                    setLoggedUserData((prevUserData) => {
                        if (prevUserData) {
                            const updatedUserData = {
                                ...prevUserData,
                                asfCoins: prevUserData.asfCoins + 2,
                            };
                            return updatedUserData;
                        }
                        return prevUserData;
                    });
                }
                break;
            case 'cherish':
                if (message.type === 'post') {
                    const userId = message.data.userId;
                    if (loggedUserData?.id !== userId) {
                        setLoggedUserData((prevUserData) => {
                            if (prevUserData) {
                                return {
                                    ...prevUserData,
                                    asfCash: prevUserData.asfCash + 1,
                                };
                            }
                            return prevUserData;
                        });
                    }
                    if (loggedUserData?.id === userId) {
                        setLoggedUserData((prevUserData) => {
                            if (prevUserData) {
                                return {
                                    ...prevUserData,
                                    asfCoins: prevUserData.asfCoins - 2,
                                };
                            }
                            return prevUserData;
                        });
                    }
                }
                if (message.type === 'comment') {
                    const userId = message.data.userId;
                    const commentCreator = message.data.commentCreator;
                    if (loggedUserData?.id !== commentCreator) {
                        setLoggedUserData((prevUserData) => {
                            if (prevUserData) {
                                return {
                                    ...prevUserData,
                                    asfCoins: prevUserData.asfCash + 1,
                                };
                            }
                            return prevUserData;
                        });
                    }
                    if (loggedUserData?.id === userId) {
                        setLoggedUserData((prevUserData) => {
                            if (prevUserData) {
                                return {
                                    ...prevUserData,
                                    asfCoins: prevUserData.asfCoins - 2,
                                };
                            }
                            return prevUserData;
                        });
                    }
                }
                break;
            case 'depreciate':
                if (message.type === 'post') {
                    const userId = message.data.userId;
                    if (loggedUserData?.id !== userId) {
                        setLoggedUserData((prevUserData) => {
                            if (prevUserData) {
                                return {
                                    ...prevUserData,
                                    asfCash: prevUserData.asfCash - 1,
                                };
                            }
                            return prevUserData;
                        });
                    }
                    if (loggedUserData?.id === userId) {
                        setLoggedUserData((prevUserData) => {
                            if (prevUserData) {
                                return {
                                    ...prevUserData,
                                    asfCoins: prevUserData.asfCoins - 2,
                                };
                            }
                            return prevUserData;
                        });
                    }
                }
                if (message.type === 'comment') {
                    const userId = message.data.userId;
                    const commentCreator = message.data.commentCreator;
                    if (loggedUserData?.id === commentCreator) {
                        setLoggedUserData((prevUserData) => {
                            if (prevUserData) {
                                return {
                                    ...prevUserData,
                                    asfCash: prevUserData.asfCash - 1,
                                };
                            }
                            return prevUserData;
                        });
                    }
                    if (loggedUserData?.id === userId) {
                        setLoggedUserData((prevUserData) => {
                            if (prevUserData) {
                                return {
                                    ...prevUserData,
                                    asfCoins: prevUserData.asfCoins - 2,
                                };
                            }
                            return prevUserData;
                        });
                    }
                }
                break;
            default:
                console.warn('Unknown action type:', message.action);
                break;
        }
    };

    const updateLoggedUserData = (data: LoggedUser) => {
        setLoggedUserData(data);
    };

    useEffect(() => {
        fetchLoggedUser();
    }, []);

    return (
        <UserContext.Provider value={{
            updateLoggedUserData,
            loggedUserData
        }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
