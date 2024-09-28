import { Header } from "../../components/Header";
import { Logon } from "../../components/Logon";
import { LayoutContainer } from "./styles";

export function LoginLayout() {
    return (
        <LayoutContainer>
            <Header />
            <Logon />
        </LayoutContainer>
    );
}
