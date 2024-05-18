import { Plus } from "phosphor-react";
import { Link } from "react-router-dom";
import logoLight from "../../assets/logo-light.png";
import { HeaderContainer } from "./styles";

export function Header() {
    return (
        <HeaderContainer>
            <div>
                <Link to={"/"}>
                    <img src={logoLight} alt="" />
                </Link>

                <Link to={"/posts/create"}>
                    <Plus size={50} />
                </Link>
            </div>
        </HeaderContainer>
    );
}