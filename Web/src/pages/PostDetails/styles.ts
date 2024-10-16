import styled from "styled-components";

export const Votes = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-right: 8px;
    p{
        font-size: 0.875rem;
    }
    span {
        cursor: pointer;
        &:hover svg {
            color: ${props => props.theme.colors.color_600};
        }
    }
    
    div {
        border-width: 0px 1px 0px 0px;
        border: 1px dotted ${props => props.theme.texts.text_600};
        width: 1px;
        height: 100%;
        min-height: 8px;
    }
`

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

    span {
        line-height: 0;
        padding: 3px;
        margin-left: 2px;
        &:hover svg {
            color: ${props => props.theme.colors.color_600};
        }
    }

    span:hover {
        cursor: pointer;
        border-radius: 4px;
        background: ${props => props.theme.colors.color_200};
    }
`

export const Title = styled.div`
    font-size: 2rem;
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
    
    strong {
        margin-bottom: 10px;
        color: ${props => props.theme.texts.text_800};
    }

    textarea {
        width: 100%;
        height: 150px;
        padding: 12px 20px;
        border-radius: 8px;
        resize: none;
        border: 1px solid ${props => props.theme.texts.text_300};
        &:focus {
            border: 0.5px solid ${props => props.theme.colors.color_600};
        }
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
    div {
        display: flex;
        flex: 1;
        flex-direction: column;
        margin-bottom: 10px;
        width: 100%;

        strong {
            color: ${props => props.theme.texts.text_950};
        }
        
        textarea {
            width: 100%;
            height: 150px;
            padding: 12px 20px;
            border-radius: 8px;
            resize: none;
            border: 1px solid ${props => props.theme.texts.text_300};
            &:focus {
                border: 0.5px solid ${props => props.theme.colors.color_600};
            }
        }
    }

    button {
        margin-top: 12px;
        padding: 0.30rem 0.70rem;
    }
`