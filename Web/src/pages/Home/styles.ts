import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    width: 48vw;
    margin-right: 2vw;
    max-width: 869px;
`

export const Menu = styled.ul`
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    background: ${props => props.theme.colors.color_800};
    margin-bottom: 16px;
    border-radius: 4px;
    padding: 4px;
    font-size: 0.875rem;
    width: 48vw;
    max-width: 869px;
`

interface MenuItemProps {
    isActive: boolean;
}

export const MenuItem = styled.li<MenuItemProps>`
    cursor: pointer;
    display: inline;
    padding: 4px;
    color: ${({ isActive, theme }) => (
        isActive ?
            theme.texts.text_300 :
            theme.texts.text_950
    )};
    &:hover {
        color: ${props => props.theme.texts.text_100};
    }
    &:first-child {
        margin-right: 14px;
    }
    &:last-child {
        margin-left: 8vw;
    }
`;

export const StyledPosts = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    p {
        color: ${props => props.theme.texts.text_950};
    }
`

export const StyledPost = styled.div`
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
                background: ${props => props.theme.colors.color_200};
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
    p {
        display: inline;
    }
    p:first-child {
        margin-right: 8px;
    }
`

export const Info = styled.div`
    display: block;
    height: 100%;
    padding: 0.2rem 0.25rem 0.4rem 0.5rem;
    font-size: 0.75rem;
    color: ${props => props.theme.texts.text_600};
    p {
        display: inline;
    }
    p:not(:last-child) {
        margin-right: 8px;
    }
`
