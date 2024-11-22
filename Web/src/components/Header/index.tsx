import { Plus } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logoLight from '../../assets/logo-light.png';
import { useUser } from '../UserContext';
import { ASFCash, ASFCoins, Coins, HeaderContainer, Logo } from './styles';

export function Header() {
    const [isLoggedIn, setLoggedId] = useState<string | null>(null);

    const { loggedUserData, logout } = useUser();

    useEffect(() => {
        const loggedStatus = localStorage.getItem("LoggedStatus");
        setLoggedId(loggedStatus);
    }, []);
    const handleLogout = () => {
        localStorage.clear();
        setLoggedId(null);
        logout();
    };

    return (
        <HeaderContainer>
            <Logo>
                <Link to={"/home"}>
                    <img src={logoLight} alt="Logo" />
                </Link>
                <p>{loggedUserData?.name}
                    {isLoggedIn ?
                        "! Bem vindo de volta!" : null
                    }
                </p>
            </Logo>
            <div>
                {isLoggedIn ? (
                    <>
                        <Coins>
                            <ASFCoins></ASFCoins>
                            <p>{loggedUserData == undefined ? 0 :
                                loggedUserData?.asfCoins > 0 ? loggedUserData?.asfCoins : 0
                            }</p>
                            <ASFCash></ASFCash>
                            <p>{loggedUserData == undefined ? 0 :
                                loggedUserData?.asfCash > 0 ? loggedUserData?.asfCash : 0
                            }</p>
                        </Coins>
                        <Link to={"/posts/create"}>
                            <Plus size={34} />
                        </Link>
                        <a href="#" onClick={handleLogout}>
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
