// Header.tsx
import { Link } from 'react-router-dom';
import { Plus } from 'phosphor-react';
import { useAuth } from '../ContextProviders/AuthContext'; // Adjust the import path
import logoLight from '../../assets/logo-light.png';
import { HeaderContainer } from './styles';

export function Header() {
    const { isLoggedIn, logout } = useAuth();

    return (
        <HeaderContainer>
            <Link to={"/home"}>
                <img src={logoLight} alt="Logo" />
            </Link>
            <div>
                {isLoggedIn ? (
                    <>
                        <Link to={"/posts/create"}>
                            <Plus size={34} />
                        </Link>
                        <a href="#" onClick={logout}>
                            <h4>Sair</h4>
                        </a>
                    </>
                ) : (
                    <Link to={"/login"}>
                        <h4>Login</h4>
                    </Link>
                )}
            </div>
        </HeaderContainer>
    );
}
