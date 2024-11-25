import { Blockquote } from '@tiptap/extension-blockquote'; // Import Blockquote for block quotes
import { BulletList } from '@tiptap/extension-bullet-list'; // Bullet (unordered) list
import { Code } from '@tiptap/extension-code'; // Import Code for inline code formatting
import { Link as LinkExtension } from '@tiptap/extension-link'; // Import Link for hyperlinks
import { OrderedList } from '@tiptap/extension-ordered-list'; // Ordered (numbered) list
import { Strike } from '@tiptap/extension-strike'; // Import Strike for strikethrough text
import { TextAlign } from '@tiptap/extension-text-align';
import { TextStyle } from '@tiptap/extension-text-style'; // Import TextStyle extension for underlining text
import { Underline } from '@tiptap/extension-underline'; // Import the extension
import { EditorContent, useEditor } from '@tiptap/react'; // Import necessary functions from Tiptap
import { StarterKit } from '@tiptap/starter-kit'; // Import the StarterKit for basic editor features
import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Toolbar } from '../../components/ToolBar'; // Create a custom toolbar component
import { useUser } from "../../components/UserContext";
import api from "../../services/api";
import { Container, CustonInput } from "../../styles/global";
import {
    Buttons, Content, CustonSelect, EditorBar, Event, PostForm, Title
} from "./styles";

export default function PostCreate() {
    const [title, setTitle] = useState('');
    const [option, setOption] = useState('');
    const [state, setState] = useState('');

    const { loggedUserData } = useUser();
    const navigate = useNavigate();

    const isLoggedIn = localStorage.getItem("LoggedStatus");
    const token = JSON.parse(localStorage.getItem("Token") || "null");

    // Tiptap Editor setup with multiple extensions
    const editor = useEditor({
        extensions: [
            StarterKit,
            TextStyle,
            Strike,
            Code,
            LinkExtension,
            Blockquote,
            BulletList, // Add the BulletList extension here
            OrderedList, // Add the OrderedList extension here
            Underline,  // Add Underline extension here
            TextAlign.configure({
                types: ['paragraph', 'heading'], // Apply to paragraph and heading blocks
            }),
        ],
        content: '',
    });

    const handleEventStateChange = (event: ChangeEvent<HTMLInputElement>) => {
        setState(event.target.value);
    };

    async function handleNewPostCreate(event: FormEvent) {
        event.preventDefault();
        if (!isLoggedIn || !token) {
            localStorage.clear();
            alert(`Fantasmas não podem criar conteúdos.`);
            navigate('/login');
            return;
        }
        const userId = loggedUserData?.id;
        try {
            await api.post('/post', { title, content: editor?.getHTML(), option, state, userId, token });
            setTitle('');
            editor?.commands.clearContent();
            setOption('');
            navigate('/home');
        } catch (error: any) {
            alert(error.response.data.message);
        }
    };

    const handleNewTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const handleOptionChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setOption(event.target.value);
        if (option !== "event") {
            setState('');
        }
    };

    return (
        <Container>
            <PostForm onSubmit={handleNewPostCreate}>
                <h1>Publicar nova postagem</h1>
                <Title>
                    <label htmlFor="postTitle">Título da postagem</label>
                    <CustonInput
                        type="text"
                        id="postTitle"
                        value={title}
                        onChange={handleNewTitleChange}
                        required
                    />
                </Title>
                <Content>
                    <label htmlFor="postContent">Conteúdo da postagem</label>
                    <EditorBar>
                        <Toolbar editor={editor} />
                        <EditorContent editor={editor} />
                    </EditorBar>
                </Content>
                <label>Tipo da postagem</label>
                <CustonSelect
                    value={option}
                    onChange={handleOptionChange}
                    style={{ padding: '8px', fontSize: '14px' }}
                >
                    <option value="" disabled>Selecione o tipo de postagem</option>
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
