import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { Container } from "../../styles/global";
import {
    Buttons, Content, CustonInput,
    Option, PostForm, Title
} from "./styles";
import { LoggedUser } from "../../interfaces";

export default function PostCreate() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [option, setOption] = useState('');
    const navigate = useNavigate();

    const isLoggedIN = localStorage.getItem("LoggedStatus");
    const token = JSON.parse(localStorage.getItem("Token") || "null");
    const loggedUser = JSON.parse(localStorage.getItem("Data") || "null");

    async function handleNewPostCreate(event: FormEvent) {
        event.preventDefault();
        if (!isLoggedIN || !token) {
            localStorage.clear();
            alert(`Fantasmas não podem criar conteudos.`);
            navigate('/login');
            return;
        }
        const userId = loggedUser?.id
        try {
            await api.post('/post', { title, content, option, userId, token });
            setTitle('');
            setContent('');
            setOption('');
            navigate('/home');
        } catch (error) {
            console.log("Error creating the post.", {
                Title: title,
                Content: content,
                Option: option,
                UserId: userId,
                Token: token
            }, error);
        }
    };

    const handleNewTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    function handleNewContentChange(event: ChangeEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('');
        setContent(event.target.value);
    };

    const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
        setOption(event.target.value);
    };

    return (
        <Container>
            <PostForm onSubmit={handleNewPostCreate}>
                <h1>Publicar nova postagem</h1>
                <Title>
                    <label htmlFor="postTitle">Titul da postagem</label>
                    <CustonInput
                        type="text"
                        id="postTitle"
                        onChange={handleNewTitleChange}
                        required
                    />
                </Title>
                <Content>
                    <label htmlFor="postContent">Conteudo da postagem</label>
                    <textarea
                        name="content"
                        id="postContent"
                        rows={14}
                        value={content}
                        onChange={handleNewContentChange}
                        required
                    ></textarea>
                </Content>
                <p>Tipo da postagem</p>
                <Option>
                    <input
                        type="radio"
                        id="event"
                        name="postOption"
                        value="event"
                        checked={option === "event"}
                        onChange={handleOptionChange}
                    />
                    <label htmlFor="event">Evento</label>
                </Option>
                <Option>
                    <input
                        type="radio"
                        id="help"
                        name="postOption"
                        value="help"
                        checked={option === "help"}
                        onChange={handleOptionChange}
                    />
                    <label htmlFor="help">Ajuda</label>
                </Option>
                <Option>
                    <input
                        type="radio"
                        id="question"
                        name="postOption"
                        value="question"
                        checked={option === "question"}
                        onChange={handleOptionChange}
                    />
                    <label htmlFor="question">Pergunta</label>
                </Option>
                <Option>
                    <input
                        type="radio"
                        id="curiosity"
                        name="postOption"
                        value="curiosity"
                        checked={option === "curiosity"}
                        onChange={handleOptionChange}
                    />
                    <label htmlFor="curiosity">Curiosidade</label>
                </Option>

                <Buttons>
                    <Link to={"/"}>
                        <button>
                            Cancelar
                        </button>
                    </Link>
                    <button type="submit">Enviar</button>
                </Buttons>
            </PostForm>
        </Container>
    );
}
