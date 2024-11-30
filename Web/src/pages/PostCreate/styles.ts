import styled from "styled-components";

export const PostForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: start;
    width: 100%;
    padding: 1rem;
    span {
        font-size: 2rem;
    }
    p {
        margin-bottom: 8px;
    }
`;

export const Title = styled.div`
    margin-top: 32px;
    width: 100%;
`;

export const Content = styled.div`
    margin-top: 32px;
    margin-bottom: 32px;
    width: 100%;
    font-size: 0.875rem;
    div:first-child {
        border: 1px solid ${props => props.theme.texts.text_500};
        border-radius: 8px;
        p {
            margin: 0;
        }
        &:focus {
            border: 1px solid ${props => props.theme.colors.color_600};
        }
    }
`;

export const CustonSelect = styled.select`
    display: block;
    width: 50%;
    margin-bottom: 32px;
    padding: 0.5rem;
    border: 1px solid ${props => props.theme.texts.text_500};
    border-radius: 8px;
    &:focus {
        border: 1px solid ${props => props.theme.colors.color_600};
    }
`;

export const Event = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
`;

export const Buttons = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: end;
    width: 100%;
    margin-top: 32px;
    button {
        padding: 0.30rem 0.70rem;
    }
    button:not(:first-child) {
        margin-left: 1rem;
    }
`;

export const EditorBar = styled.form`
    border-radius: 8px;
    div:first-child {
        border: 1px solid ${props => props.theme.texts.text_500};
        border-radius: 8px;
    }
    
    div {
        div:last-child {
            padding: 2rem 1rem;
        }
    }
    
    &:focus-within {
        border-color: ${props => props.theme.colors.color_600}; /* Change border color */
    }

    /* Targeting the children div (Toolbar and EditorContent) */

    /* Apply focused border styles to the child divs when EditorContent or Toolbar is focused */
    &:focus-within div {
        border-color: ${props => props.theme.colors.color_600}; /* Change border color */
    }
`;
