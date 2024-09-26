import { Check } from 'phosphor-react';
import { AsfCash, AsfCoins, Border, Coins, HeaderContainer, Post, PostInfo, Posts, Titulo, UserInfo } from './style'
import ghost from '/ghost.svg'
import { Link } from 'react-router-dom';

export function UserBar() {
    return (
        <HeaderContainer>
            <UserInfo>
                <div>
                    <img src={ghost} />
                    <Check size={20} />
                </div>
                <h3>Matheus Barth</h3>
                <p>São Paulo</p>
            </UserInfo>
            <Border />
            <Posts>
                <h4>Interações recentes</h4>
                <Post>
                    <Link to={"/posts/fec28773-a5f7-4b35-8706-fc0a684b33b4"}>
                        <PostInfo>
                            <p>Matheus Barth</p>
                            <time>
                                há 5 dias
                            </time>
                        </PostInfo>
                        <Titulo>
                            <p>A Importância da Sustentabilidade nas Cidades</p>
                        </Titulo>
                        <Coins>
                            <AsfCoins><div></div><p>6</p></AsfCoins>
                            <AsfCash><div></div><p>2</p></AsfCash>
                        </Coins>
                    </Link>
                </Post>
            </Posts>
        </HeaderContainer>
    );
}