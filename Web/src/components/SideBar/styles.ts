import styled from "styled-components";
;
export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 24vw;
    margin-left: 4vw;
    margin-right: 2vw;
`;

export const PostsHolder = styled.div`
    background: ${props => props.theme.colors.color_white_opack};
    border-radius: 4px 4px 4px 4px;
`;

export const Message = styled.p`
    font-size: 0.75rem;
    padding: 0.75rem;
`;

export const StyledPost = styled.div`
    width: auto;
    &:hover a {
        div {
            div{
                background: ${props => props.theme.colors.color_200};
                border-radius: 4px 4px 4px 4px;
            }
        }
    }
    &:not(:first-child) {
        border-top: 1px solid ${props => props.theme.colors.color_600};
    }
`;

export const Content = styled.div`
`;

export const Title = styled.div`
    display: block;
    padding: 0.5rem 0.25rem 0.25rem 0.5rem;
    font-size: 0.75rem;
    p {
        display: inline;
    }
    p:first-child {
        margin-right: 8px;
    }
`;

export const Info = styled.div`
    display: block;
    height: 100%;
    padding: 0.2rem 0.25rem 0.4rem 0.5rem;
    font-size: 0.625rem;
    color: ${props => props.theme.texts.text_600};
    p {
        display: inline;
    }
    p:not(:last-child) {
        margin-right: 8px;
    }
`;
