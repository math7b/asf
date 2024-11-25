import styled from "styled-components";

export const Votes = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-right: 8px;
    p{
        font-size: 0.875rem;
    }
    div {
        border-width: 0px 1px 0px 0px;
        border: 1px dotted ${props => props.theme.texts.text_600};
        width: 1px;
        height: 100%;
        min-height: 8px;
    }
`

export const VoteButton = styled.span<{ disabled?: boolean }>`
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
    opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
    transition: opacity 0.2s ease;
    line-height: 0;

    &:hover {
        opacity: ${({ disabled }) => (disabled ? 0.5 : 0.8)};
    }
`;

export const Content = styled.div`
    flex: 1;
    flex-direction: column;
    font-size: 1rem;
    line-height: 1.6;
    
    color: ${props => props.theme.texts.text_800};
`

export const Info = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: auto;
    padding: auto;
    div {
        display: flex;
        flex-direction: row;
        
        p {
            margin-right: 8px;
            color: ${props => props.theme.texts.text_800};
        }
        
        time {
            color: ${props => props.theme.texts.text_800};
        }
    }
`

export const DeleteButton = styled.span<{ disabled?: boolean }>`
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
    opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
    transition: opacity 0.2s ease;
    line-height: 0;
    padding: 3px;
    margin-left: 2px;
    &:hover svg {
            color: ${props => props.theme.colors.color_600};
    }
    &:hover {
        border-radius: 4px;
        background: ${props => props.theme.colors.color_200};
    }
`;

export const Title = styled.div`
    font-size: 1rem;
`;

export const Reply = styled.div`
    margin-left: 20px;
`;

export const CreateComment = styled.form`
    display: flex;
    flex-direction: column;
    align-items: start;
    width: 100%;
    padding-top: 1rem;
    strong {
        margin-bottom: 10px;
        color: ${props => props.theme.texts.text_800};
    }
    footer {
        visibility: hidden;
        max-height: 0;
        button {
            margin-top: 12px;
            padding: 0.30rem 0.70rem;
        }
    }
    
    &:focus-within footer {
        visibility: visible;
        max-height: none;
    }
`

export const CreateReplay = styled.form`
    display: flex;
    flex-direction: column;
    align-items: start;
    width: 100%;
    padding-top: 1rem;
    padding-left: 1rem;
    button {
        margin-top: 12px;
        padding: 0.30rem 0.70rem;
    }
`

export const EditorBar = styled.div`
    border-radius: 8px;
    width: 100%;
    div:first-child {
        border: 1px solid ${props => props.theme.texts.text_500};
        border-radius: 8px;
    }
    p, h2 {
        padding: 1rem 2rem;
        margin: 0;
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
