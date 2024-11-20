
import styled from "styled-components";

export const Container = styled.main`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    img {
        background: ${props => props.theme.colors.color_300};
        border-radius: 50px;
        width: 70px;
        height: 70px;
        margin-top: 24px;
        margin-bottom: 16px;
    }
    form {
        background: ${props => props.theme.colors.color_300};
        border-radius: 4px;
        width: 28vw;
        padding: 16px;
        display: flex;
        flex-direction: column;
        label {
            margin-left: 8px;
        }
        label:not(:first-child) {
            margin-top: 16px;
        }
        button {
            margin: 0;
            margin-top: 16px;
        }
    }
`;

export const Message = styled.div`
    font-size: 1.375rem;
    margin-bottom: 16px;
`;

export const BecomeBeekeeper = styled.div`
    background: ${props => props.theme.colors.color_300};
    margin-top: 16px;
    padding: 16px 28px;
    border-radius: 4px;
    div:not(:first-child) {
        margin-top: 16px;
    }
    div {
        a {
            color: ${props => props.theme.texts.text_050};
        }
        a:hover {
            text-decoration: underline;
        }
    }
`;

export const Cadastre = styled.div`
    a {
        margin-left: 4px;
    }
`;