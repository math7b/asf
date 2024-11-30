import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header";
import { Container, LayoutContainer } from "./styles";

export function BeeLayout() {
    return (
        <LayoutContainer>
            <Header />
            <Container>
                <Outlet />
            </Container>
        </LayoutContainer>
    );
}
