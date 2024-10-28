import { Header } from "../../components/Header";
import { Logon } from "../../pages/Logon";
import { LayoutContainer } from "./styles";

export function LoginLayout() {
    return (
        <LayoutContainer>
            <Header />
            <Logon />
        </LayoutContainer>
    );
}
