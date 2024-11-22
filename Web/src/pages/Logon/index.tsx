import { FormEvent, useState } from "react";
import { BecomeBeekeeper, Cadastre, Container, Message } from "./styles";
import api from "../../services/api";
import { Link, useNavigate } from "react-router-dom";
import { LoggonApi } from "../../interfaces";
import { CustonInput } from "../../styles/global";
import logoLight from '../../assets/logo-light.png';
import { useUser } from "../../components/UserContext";

export function Logon() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const {updateLoggedUserData} = useUser();
    
    async function Logon(event: FormEvent) {
        event.preventDefault();
        try {
            const response = await api.post<LoggonApi>('/logon', { email, password })
            localStorage.setItem("Token", JSON.stringify(response.data.Token))
            localStorage.setItem("LoggedStatus", "true")
            localStorage.setItem("LoggedUserId", JSON.stringify(response.data.Data.id))
            await updateLoggedUserData(response.data.Data)
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
            <Link to={"/home"}>
                <img src={logoLight} alt="Logo" />
            </Link>
            <Message>Bem vindo de volta!</Message>
            <form onSubmit={Logon}>
                <label htmlFor="femail">Seu e-mail:</label>
                <CustonInput type="email"
                    id="femail"
                    name="femail"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="email@email.com"
                    required
                />
                <label htmlFor="fpassword">Senha</label>
                <CustonInput type="password"
                    id="fpassword"
                    name="fpassword"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Senha"
                    required
                />
                <button type="submit">
                    Logar
                </button>
            </form>
            <BecomeBeekeeper>
                <Cadastre>
                    <span>Novo por aqui?<Link to={"/register"}>Cadastrese</Link></span>
                </Cadastre>
            </BecomeBeekeeper>
        </Container>
    );
}