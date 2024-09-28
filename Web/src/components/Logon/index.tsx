import { FormEvent, useEffect, useState } from "react";
import { Container } from "./styles";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../ContextProviders/AuthContext";

export function Logon() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    async function Logon(event: FormEvent) {
        event.preventDefault();
        try {
            const logon = await api.post('/logon', { email, password })
            const response = logon.data;
            login(response); // Update the context state
            setEmail('');
            setPassword('');
            navigate('/home');
        } catch (error) {
            console.error('Error during login:', error);
            alert('Email or password incorrect.');
        }
    }

    return (
        <Container>
            <form onSubmit={Logon}>
                <label htmlFor="femail">Your e-mail:</label>
                <input type="email"
                    id="femail"
                    name="femail"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="email@email.com"
                    required
                />
                <label htmlFor="fpassword">Your password:</label>
                <input type="password"
                    id="fpassword"
                    name="fpassword"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
                <button type="submit">
                    Publicar
                </button>
            </form>
        </Container>
    );
}