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

    textarea {
        display: block;
        width: 100%;
        margin-top: 8px;
        padding: 1rem 6rem;
        border-radius: 8px;
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
    border: 1px solid #767676;
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