import { Check } from 'phosphor-react';
import { AsfCoins, Border, HeaderContainer, Post, PostInfo, Posts, Titulo, UserInfo } from './style'
import ghost from '/ghost.svg'

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
                    <PostInfo>
                        <p>Matheus Barth</p>
                        <time>
                            há 5 dias
                        </time>
                    </PostInfo>
                    <Titulo>
                        <p>A Importância da Sustentabilidade nas Cidades</p>
                    </Titulo>
                    <AsfCoins>
                        <p>AsfCoins: 6</p>
                        <p>AsfCash: 2</p>
                    </AsfCoins>
                </Post>
            </Posts>
        </HeaderContainer>
    );
}