import styled from "styled-components";

export const Container = styled.main`
    flex: 1;
    
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
export const Posts = styled.div`

    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`

export const Post = styled.div`
    width: 40%;
    img {
        width: 100%;
        border-radius: 0px 0px 24px 24px;
        border-bottom: 1px solid transparent;
    }
    &:not(:first-child) {
        margin-top: 2rem;
    }
    &:hover {
        img{
            border-bottom: 1px solid ${props => props.theme.colors.color_800};
        }
    }
    &:hover a {
        div {
            div{
                background-color: ${props => props.theme.colors.color_200};
                border-radius: 4px 4px 0px 0px;
            }
        }
    }
`

export const Content = styled.div`
    background-color: ${props => props.theme.colors.color_white_opack};
    border-radius: 4px 4px 0px 0px;    
`

export const Title = styled.div`
    display: block;
    padding: 0.5rem 0.25rem 0.25rem 0.5rem;
    font-size: 0.875rem;
`

export const Info = styled.div`
    display: inline;
    height: 100%;
    margin: 0 0.5rem 0.5rem 0.5rem;
    font-size: 0.75rem;
    color: ${props => props.theme.texts.text_600};
    p {
        display: inline;
    }
    p:not(:last-child) {
        margin-right: 8px;
    }
`
