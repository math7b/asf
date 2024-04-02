import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { useEffect, useState } from "react";
import api from "../../services/api";
import {
    Container, Content, Info, Post, Posts, Title
} from "./styles";

interface Posts {
    id: string;
    title: string;
    content: String;
    asfCoins: number;
    createdAt: string;
    option: String;
}

export default function Home() {
    const [posts, setPosts] = useState<Posts[]>([]);

    useEffect(() => {
        api.get<Posts[]>('/posts').then(response => {
            setPosts(response.data);
        });
    }, []);
    console.log(posts);
    return (
        <Container>
            <Posts>
                {posts.map(post => {
                    return (
                        <Post>
                            <a href="#">
                                <div key={post.id}>
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
                                        `src/assets/${
                                            post.option === "event" ? "event.jpg" :
                                            post.option === "help" ? "help.jpg" :
                                            post.option === "question" ? "question.jpg" :
                                            post.option === "curiosity" ? "curiosity.jpg" : 
                                            "event.jpg"
                                        }`}
                                        alt=""
                                    />
                                </div>
                            </a>
                        </Post>
                    )
                })}
            </Posts>
        </Container>
    );
}