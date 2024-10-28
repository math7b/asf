import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { Link } from "react-router-dom";
import {
    Container, Content, Info, Menu, MenuItem, StyledPost, StyledPosts, Title
} from "./styles";
import { Post } from "../../interfaces";
import { usePosts } from "../../components/PostContext";
import { useEffect, useState } from "react";

export default function Home() {
    const [menuOption, setMenuOption] = useState('all');

    const { posts, loading, error } = usePosts();

    useEffect(() => {
        if (error) {
            console.log("Error loading post details.");
            alert("Error loading post details.");
        }
    }, [error]);
    if (loading) return <p>Loading posts...</p>;

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
                    Urgentes
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
            </Menu>
            <StyledPosts>
                {filteredPosts.length > 0 ? (
                    filteredPosts.map((post: Post) => (
                        <StyledPost key={post.id}>
                            <Link to={`../posts/${post.id}`}>
                                <div>
                                    <Content>
                                        <Title>
                                            <p>{
                                                post.option === "event" ? "[Eventos]" :
                                                    post.option === "help" ? "[Urgentes]" :
                                                        post.option === "question" ? "[Duvidas]" :
                                                            post.option === "curiosity" ? "[Curiosidades]" :
                                                                null
                                            }</p>
                                            <p>{post.title}</p>
                                        </Title>
                                        <Info>
                                            <p>{post.asfCoins} Coins</p>
                                            <time>{
                                                formatDistanceToNow(post.createdAt, {
                                                    locale: ptBR,
                                                    addSuffix: true,
                                                })
                                            }</time>
                                        </Info>
                                    </Content>
                                    <img src={'src/assets/flower.jpg'} alt="" />
                                </div>
                            </Link>
                        </StyledPost>
                    ))
                ) : <p>Sem postagens</p>}
            </StyledPosts>
        </Container>
    );
}