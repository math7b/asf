import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header";
import { Container, LayoutContainer } from "./styles";
import { UserBar } from "../../components/User";

export function DefaultLayout() {
    return (
        <LayoutContainer>
            <Header />
            <Container>
                <UserBar />
                <Outlet />
            </Container>
        </LayoutContainer>
    )
}