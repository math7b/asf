import styled from "styled-components";

export const HeaderContainer = styled.div`
    display: flex;
    align-items: start;
    justify-content: space-between;
    background: ${props => props.theme.colors.color_400};
    margin-bottom: 8vh;
    height: 11vh;
    a img {
        width: 14vh;
        height: auto;
    }
    div {
        display: flex;
        margin-right:16px;
        height: 100%;
        a {
            padding: 1rem;
        }
        svg {
            height: 100%;
            align-items: center;
        }
        a h4{
            height: 100%;
            display: flex;
            align-items: center;
            padding: 0.5rem;
        }
    }
`