import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
    Container, Content, Info, Post, StyledPosts, Title
} from "./styles";
import { Posts } from "../../interfaces";
import { usePosts } from "../../components/ContextProviders/PostContext";

export default function Home() {
    const { posts, loading, error } = usePosts();
    if (loading) return <p>Loading posts...</p>;
    if (error) return <p>Error loading posts: {error}</p>;
    return (
        <Container>
            <StyledPosts>
                {posts.map((post: Posts) => (
                    <Post key={post.id}>
                        <Link to={`../posts/${post.id}`}>
                            <div>
                                <Content>
                                    <Title>
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
                                <img src={
                                    `src/assets/${post.option === "event" ? "event.jpg" :
                                        post.option === "help" ? "help.jpg" :
                                            post.option === "question" ? "question.jpg" :
                                                post.option === "curiosity" ? "curiosity.jpg" :
                                                    "event.jpg"
                                    }`}
                                    alt=""
                                />
                            </div>
                        </Link>
                    </Post>
                ))}
            </StyledPosts>
        </Container>
    );
}