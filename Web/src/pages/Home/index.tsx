import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { Link } from "react-router-dom";
import {
    Container, Content, Info, StyledPost, StyledPosts, Title
} from "./styles";
import { Post } from "../../interfaces";
import { usePosts } from "../../components/PostContext";
import { useEffect } from "react";

export default function Home() {
    const { posts, loading, error } = usePosts();

    useEffect(() => {
        if (error) {
            console.log("Error loading post details.");
            alert("Error loading post details.");
        }
    }, [error]);
    if (loading) return <p>Loading posts...</p>;

    return (
        <Container>
            <StyledPosts>
                {posts.map((post: Post) => (
                    <StyledPost key={post.id}>
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
                    </StyledPost>
                ))}
            </StyledPosts>
        </Container>
    );
}