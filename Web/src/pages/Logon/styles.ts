import styled from "styled-components";

export const Container = styled.main`
    display: flex;
    justify-content: center;
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
            margin-top: 16px;
        }
    }
`;