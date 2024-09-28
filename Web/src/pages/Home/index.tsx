import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import {
    Container, Content, Info, Post, Posts, Title
} from "./styles";
import { useAuth } from "../../components/ContextProviders/AuthContext";

export default function Home() {
    const { userData } = useAuth();

    if (userData?.posts.length === 0) {
        return <div>loading...</div>
    }

    return (
        <Container>
            <Posts>
                {userData?.posts.map(post => {
                    return (
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
                    )
                })}
            </Posts>
        </Container>
    );
}