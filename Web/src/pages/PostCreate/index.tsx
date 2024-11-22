import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../components/UserContext";
import api from "../../services/api";
import { Container, CustonInput } from "../../styles/global";
import {
    Buttons, Content,
    CustonSelect,
    Event,
    PostForm, Title
} from "./styles";

export default function PostCreate() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [option, setOption] = useState('');
    const [state, setState] = useState('');

    const { loggedUserData } = useUser();

    const navigate = useNavigate();

    const isLoggedIn = localStorage.getItem("LoggedStatus");
    const token = JSON.parse(localStorage.getItem("Token") || "null");


    // Handle event state change (for the 'event' option)
    const handleEventStateChange = (event: ChangeEvent<HTMLInputElement>) => {
        setState(event.target.value);
    };

    async function handleNewPostCreate(event: FormEvent) {
        event.preventDefault();
        if (!isLoggedIn || !token) {
            localStorage.clear();
            alert(`Fantasmas não podem criar conteudos.`);
            navigate('/login');
            return;
        }
        const userId = loggedUserData?.id;
        try {
            await api.post('/post', { title, content, option, state, userId, token });
            setTitle('');
            setContent('');
            setOption('');
            navigate('/home');
        } catch (error: any) {
            alert(error.response.data.message);
            console.log("Error creating the post.", {
                Title: title,
                Content: content,
                Option: option,
                State: state,
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

    const handleOptionChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setOption(event.target.value);
        if (option !== "event") {
            setState('')
        }
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
                <CustonSelect
                    value={option}
                    onChange={handleOptionChange}
                    style={{ padding: '8px', fontSize: '14px' }}
                >
                    <option value="" disabled hidden>
                        Selecione o tipo de postagem
                    </option>
                    <option value="event">Evento</option>
                    <option value="help">Ajuda</option>
                    <option value="question">Pergunta</option>
                    <option value="curiosity">Curiosidade</option>
                </CustonSelect>
                {option === "event" && (
                    <Event>
                        <label htmlFor="state">Estado do Evento:</label>
                        <CustonInput
                            type="text"
                            id="state"
                            value={state}
                            onChange={handleEventStateChange}
                        />
                    </Event>
                )}

                <Buttons>
                    <Link to={"/home"}>
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
