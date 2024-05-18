import { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import { Container } from "../../styles/global";
import {
    Buttons, Content, CustonInput,
    Option, PostForm, Title
} from "./styles";

export default function PostCreate() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [option, setOption] = useState('');

    async function handleNewPostCreate(event: FormEvent) {
        event.preventDefault();
        const response = await api.post('/create/post', { title, content, option });

        setTitle('');
        setContent('');
        setOption('');

        window.location.href = '/';
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