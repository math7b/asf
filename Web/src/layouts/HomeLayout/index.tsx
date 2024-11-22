import { Header } from "../../components/Header";
import { SideBar } from "../../components/SideBar";
import Home from "../../pages/Home";
import { Container, LayoutContainer } from "./styles";

export function HomeLayout() {
    return (
        <LayoutContainer>
            <Header />
            <Container>
                <Home />
                <SideBar />
            </Container>
        </LayoutContainer>
    )
}