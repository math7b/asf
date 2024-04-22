import styled from "styled-components";

export const Container = styled.main`
    flex: 1;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    max-width: 1012px;
    margin-left: auto;
    margin-right: auto;

    padding: 1rem 1rem 2rem 1rem;

    background: rgba(999, 999, 999, 0.88);
    border-radius: 4px 4px 0px 0px;
`

export const Post = styled.div`
    display: flex;
    width: 100%;
    
    &:not(:first-child) {
        padding-top: 16px;
        margin-top: 16px;
    }

    button {
        margin-top: 12px;
        padding: 0.30rem 0.70rem;
    }
`

export const Votes = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-right: 8px;
    p{
        font-size: 0.875rem;
    }
    
    button {
        border: 0;
        background: none;
        line-height: 0;
        font-size: 0.875rem;

        &:hover{
            cursor: pointer;
            background: #888;
            border-radius: 4px;
            transition-duration: 300ms;
        }
    }

    div {
        border-width: 0px 1px 0px 0px;
        border: 1px dotted #999;
        width: 1px;
        height: 100%;
        min-height: 8px;
    }
`

export const Info = styled.div`
    display: flex;
    flex-direction: row;
    p {
        margin-right: 8px;
    }
`

export const Titulo = styled.div`
    font-size: 2rem;

`

export const Content = styled.div`
    font-size: 1rem;
    line-height: 1.6;
    
    color: #333;

    padding-right: 8px;
`

export const Reply = styled.div`
    margin-left: 20px;
`

export const CreateComment = styled.form`
    display: flex;
    flex-direction: column;
    align-items: start;
    
    width: 100%;
    padding-top: 1rem;
    padding-left: 1rem;
    
    strong {
        margin-bottom: 10px;
    }

    textarea {
        width: 100%;
        height: 150px;
        padding: 12px 20px;
        border: 1px solid black;
        border-radius: 8px;
        resize: none;
    }

    footer {
        visibility: hidden;
        max-height: 0;
    }
    
    &:focus-within footer {
        visibility: visible;
        max-height: none;
    }

    & button {
        margin-top: 12px;
        padding: 0.30rem 0.70rem;
    }
`

export const CreateReplay = styled.form`
    display: flex;
    flex-direction: column;
    align-items: start;
    
    width: 100%;
    padding-top: 1rem;
    padding-left: 1rem;
    
    div {
        margin-bottom: 10px;
        strong {
        }

        textarea {
            width: 100%;
            height: 150px;
            padding: 12px 20px;
            border: 1px solid black;
            border-radius: 8px;
            resize: none;
        }

        button {
            margin-top: 12px;
            padding: 0.30rem 0.70rem;
        }
    }
`