import { Check } from 'phosphor-react';
import { Border, Coins, HeaderContainer, Post, PostInfo, Posts, Titulo, UserInfo } from './style'
import ghost from '/ghost.svg'
import { Link } from 'react-router-dom';
import { useAuth } from '../ContextProviders/AuthContext';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale/pt-BR';

export function UserBar() {
    const { isLoggedIn, userData } = useAuth();

    return (
        <HeaderContainer>
            <UserInfo>
                <div>
                    <img src={ghost} />
                    {userData?.beeKeeper ? (
                        <Check size={20} />
                    ) : (null)}
                </div>
                {userData ? (
                    <h3>{userData.name}</h3>
                ) : (
                    <h3>Guest</h3>
                )}
                {userData ? (
                    <p>{userData.beeKeeper.state}</p>
                ) : (null)}
            </UserInfo>
            <Border />
            {userData?.posts.length === 0 ? (
                <h4><p>Cantinho dos seu Posts</p></h4>
            ) : (
                isLoggedIn === true ? (
                    <h4>Interações recentes</h4>
                ) : (
                    <h4>Benvindo a comunidade visitante!</h4>
                )
            )}
            <Posts>
                {userData?.posts.map(post => (
                    <Post key={post.id}>
                        <Link to={`../posts/${post.id}`}>
                            <PostInfo>
                                <p>{userData.name}</p>
                                <time>{
                                    formatDistanceToNow(post.createdAt, {
                                        locale: ptBR,
                                        addSuffix: true,
                                    })
                                }</time>
                            </PostInfo>
                            <Titulo>
                                <p>{post.title}</p>
                            </Titulo>
                            <Coins>
                                <p>{post.asfCoins} asfCoins</p>
                            </Coins>
                        </Link>
                    </Post>
                ))}
            </Posts>
        </HeaderContainer>
    );
}