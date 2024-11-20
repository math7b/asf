// Header.tsx
import { Link } from 'react-router-dom';
import { Plus } from 'phosphor-react';
import logoLight from '../../assets/logo-light.png';
import { ASFCash, ASFCoins, Coins, HeaderContainer, Logo } from './styles';
import { useEffect, useState } from 'react';
import { usePosts } from '../PostContext';
import { useUser } from '../UserContext';

export function Header() {
    const [isLoggedIn, setLoggedId] = useState<string | null>(null);

    const { loggedUserData } = useUser();

    useEffect(() => {
        const loggedStatus = localStorage.getItem("LoggedStatus");
        setLoggedId(loggedStatus);  // set the state based on localStorage
    }, []); // empty dependency array ensures this runs only once
    const handleLogout = () => {
        localStorage.clear();  // clear localStorage
        setLoggedId(null);  // update state to reflect logged-out status
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
