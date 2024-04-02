import { Link } from "react-router-dom";
import logoLight from "../../assets/logo-light.png";
import { HeaderContainer } from "./styles";

export function Header() {
    return (
        <HeaderContainer>
            <Link to={"/"}>
                <img src={logoLight} alt="" />
            </Link>
        </HeaderContainer>
    );
}