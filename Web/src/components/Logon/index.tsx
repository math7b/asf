import { FormEvent, useState } from "react";
import { Container } from "./styles";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import { LoggonApi } from "../../interfaces";

export function Logon() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function Logon(event: FormEvent) {
        event.preventDefault();
        try {
            const response = await api.post<LoggonApi>('/logon', { email, password })
            localStorage.setItem("Data", JSON.stringify(response.data.Data))
            localStorage.setItem("Token", JSON.stringify(response.data.Token))
            localStorage.setItem("LoggedStatus", "true")
            localStorage.setItem("LoggedUserId", JSON.stringify(response.data.Data.id))
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