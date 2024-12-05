import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { Link } from "react-router-dom";
import { Post } from "../../interfaces";
import { usePosts } from "../../context/PostContext";
import { useUser } from "../../context/UserContext";
import { Container, Content, Info, Message, PostsHolder, StyledPost, Title } from "./styles";
import { useEffect, useState } from "react";

export function SideBar() {
    const [stateFiltered, setStateFiltered] = useState<Post[]>([]);

    const { posts } = usePosts();
    const { loggedUserData } = useUser();

    useEffect(() => {
        const filteredPosts = posts.filter(post => post.option === "event");
        const filteredByState = filteredPosts.filter(post => post.state === loggedUserData?.state);
        setStateFiltered(filteredByState);
    }, [posts, loggedUserData]);

    return (
        <Container>
            <PostsHolder>
                <button><Link to={"/bee"}>Acesse nossa biblioteca de abelhas!</Link></button>
                {stateFiltered.length > 0 ? (
                    stateFiltered.map((post: Post) => (
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
                                </div>
                            </Link>
                        </StyledPost>
                    ))
                ) : !loggedUserData? <Message>Faça login ou crie uma conta para ver eventos no seu estado!</Message>:<Message>Não encontramos nenhum evento em {loggedUserData?.state}</Message>}
            </PostsHolder>
        </Container>
    );
}