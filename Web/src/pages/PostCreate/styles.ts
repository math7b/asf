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
    }
`;

export const Option = styled.div`
    display: block;
    margin-top: 0;
    padding: 2px 4px;

    input {
        margin-right: 8px;
    }
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