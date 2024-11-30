import Blockquote from "@tiptap/extension-blockquote";
import BulletList from "@tiptap/extension-bullet-list";
import Code from "@tiptap/extension-code";
import { Link as LinkExtension } from '@tiptap/extension-link';
import OrderedList from "@tiptap/extension-ordered-list";
import Strike from "@tiptap/extension-strike";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { CaretDown, CaretUp } from "phosphor-react";
import { FormEvent, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BeeDataInterface } from "../../interfaces";
import { Buttons, EditorBar, PostForm } from "../../pages/PostCreate/styles";
import { Content, VoteButton, Votes } from "../../pages/PostDetails/styles";
import api from "../../services/api";
import { Toolbar } from "../ToolBar";
import { useUser } from "../UserContext";
import { Container } from "./styles";

export function BeeData() {
    const token = JSON.parse(localStorage.getItem("Token") || "null");

    const [beeData, setBeeData] = useState<BeeDataInterface | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
console.log(loading)
    const { beeId } = useParams<{ beeId?: string }>();

    const { loggedUserData } = useUser(); // Assuming this hook provides user data
    const userId = loggedUserData?.id;

    const editor = useEditor({
        extensions: [
            StarterKit,
            TextStyle,
            Strike,
            Code,
            LinkExtension,
            Blockquote,
            BulletList,
            OrderedList,
            Underline,
            TextAlign.configure({
                types: ['paragraph', 'heading'],
            }),
        ],
        content: '',
    });

    const fetchBeeData = async () => {
        setLoading(true);
        try {
            const responseBee = await api.get<BeeDataInterface>(`/bee/${beeId}`);
            setBeeData(responseBee.data);
        } catch (error) {
            console.log('Failed to fetch posts.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBeeData();
    }, [beeId]);

    async function handleBeeDataCreate(event: FormEvent) {
        event.preventDefault();
        try {
            await api.post('/bee/data', { content: editor?.getHTML(), beeId, userId, token });
        } catch (error: any) {
            alert(error.response.data.message);
            console.log(
                { content: editor?.getHTML(), beeId, userId, token }
            );
        }
    };

    async function handleCherishPost(event: React.MouseEvent) {
        event.preventDefault();
        // try {
        //     await api.put(`/cherish/post/${postId}`, {}, { params: { userId, token } });
        // } catch (error: any) {
        //     console.error('Error cherishing post:', error);
        //     alert(error.response.data.message);
        // }
    }
    async function handleDepreciatePost(event: React.MouseEvent) {
        event.preventDefault();
        // try {
        //     await api.put(`/depreciate/post/${postId}`, {}, { params: { userId, token } });
        // } catch (error: any) {
        //     console.error('Error depreciating post:', error);
        //     alert(error.response.data.message);
        // }
    }
    return (
        <Container>
            {beeData ? (
                <>
                    <Votes>
                        <VoteButton onClick={(e) => {
                            handleCherishPost(e);
                        }}>
                            <CaretUp size={20} />
                        </VoteButton>
                        <p>{beeData?.value}</p>
                        <VoteButton onClick={(e) => {
                            handleDepreciatePost(e);
                        }}>
                            <CaretDown size={20} />
                        </VoteButton>
                        <div></div>
                    </Votes>
                    <Content dangerouslySetInnerHTML={{ __html: beeData.content }} />
                </>
            ) : null}
            {loggedUserData?.beeKeeper && !beeData ? (
                <PostForm onSubmit={handleBeeDataCreate}>
                    <label htmlFor="postContent">Conteúdo da postagem</label>
                    <Content>
                        <EditorBar>
                            <Toolbar editor={editor} />
                            <EditorContent editor={editor} />
                        </EditorBar>
                    </Content>
                    <Buttons>
                        <button>
                            <Link to={'../'}>
                                Cancelar
                            </Link>
                        </button>
                        <button type="submit">Enviar</button>
                    </Buttons>
                </PostForm>
            ) : null}
        </Container>
    );
}
