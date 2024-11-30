import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import flower from '../../assets/flower.jpg';
import { usePosts } from "../../components/PostContext";
import { Post } from "../../interfaces";
import {
    Container, Content, Info, Menu, MenuItem, StyledPost, StyledPosts, Title
} from "./styles";

export default function Home() {
    const [menuOption, setMenuOption] = useState('all');

    const { posts, loading, error } = usePosts();

    useEffect(() => {
        if (error) {
            console.log("Error loading post details.");
        }
    }, [error]);

    function handleToggleMenuOption(menuOption: string) {
        setMenuOption(menuOption);
    };

    const filteredPosts = menuOption === "all" ? posts : posts.filter(post => post.option === menuOption);

    return (
        <Container>
            <Menu>
                <MenuItem isActive={menuOption === "all"}
                    onClick={() => handleToggleMenuOption("all")}>
                    Home
                </MenuItem>
                <MenuItem
                    isActive={menuOption === "event"}
                    onClick={() => handleToggleMenuOption("event")}>
                    Eventos
                </MenuItem>
                <MenuItem
                    isActive={menuOption === "help"}
                    onClick={() => handleToggleMenuOption("help")}>
                    Ajuda
                </MenuItem>
                <MenuItem
                    isActive={menuOption === "question"}
                    onClick={() => handleToggleMenuOption("question")}>
                    Duvidas
                </MenuItem>
                <MenuItem
                    isActive={menuOption === "curiosity"}
                    onClick={() => handleToggleMenuOption("curiosity")}>
                    Curiosidades
                </MenuItem>
                <MenuItem
                    isActive={menuOption === "News"}
                    onClick={() => handleToggleMenuOption("News")}>
                    Novidades
                </MenuItem>
            </Menu>
            <StyledPosts>
                {loading ? 'Carregando as postagens aguarde...' : (
                    filteredPosts.length > 0 ? (
                        filteredPosts.map((post: Post) => (
                            <StyledPost key={post.id}>
                                <Link to={`../posts/${post.id}`}>
                                    <div>
                                        <Content>
                                            <Title>
                                                <p>{
                                                    post.option === "event" ? "[Evento]" :
                                                        post.option === "help" ? "[Ajuda]" :
                                                            post.option === "question" ? "[Duvida]" :
                                                                post.option === "curiosity" ? "[Curiosidade]" :
                                                                    null
                                                }</p>
                                                <p>{post.title}</p>
                                            </Title>
                                            <Info>
                                                {post.user.beeKeeper !== null ? <p>Apicultor</p> : null}
                                                <p>{post.user?.name}</p>
                                                <p>{post.value} Coins</p>
                                                <time>{
                                                    formatDistanceToNow(post.createdAt, {
                                                        locale: ptBR,
                                                        addSuffix: true,
                                                    })
                                                }</time>
                                            </Info>
                                        </Content>
                                        <img src={flower} alt="" />
                                    </div>
                                </Link>
                            </StyledPost>
                        ))
                    ) : <p>Sem postagens</p>
                )}
            </StyledPosts>
        </Container>
    );
}