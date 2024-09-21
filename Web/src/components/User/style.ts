import styled from "styled-components";

export const HeaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 16%;
    margin: 0% 4%;
    background: ${props => props.theme.colors.color_white_opack};
    padding: 4px;
    border-radius: 8px;
`;

export const UserInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    div {
        display: flex;
        flex-direction: column;
        img {
            width: 80px;
            height: auto;
            border: 2px solid ${props => props.theme.colors.color_600};
            border-radius: 100%;
        }
        svg {
            position: relative;
            left: 64px;
            bottom: 78px;
            vertical-align: middle;
            background: ${props => props.theme.colors.color_600};
            border-radius: 100%;
            display: inline;
        }
    }
    h3 {
        display: inline;
    }
`;

export const Border = styled.div`
    margin: 16px 0px;
    border-top: 1px solid ${props => props.theme.colors.color_600};
    width: 100%;
`

export const Posts = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 4px;
`;

export const Post = styled.div`
    margin-top: 16px;
    background: ${props => props.theme.colors.color_200};
    border-radius: 8px;
    padding: 1rem;
    &:hover {
        background: ${props => props.theme.colors.color_300};
    }
`;

export const PostInfo = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 0.65625rem;
    margin-bottom: 1rem;
    `;

export const Titulo = styled.div`
    font-size: 0.71875rem;
    margin-bottom: 1rem;
`;

export const Coins = styled.div`
    display: flex;
    flex-direction: row;
    `;

export const AsfCoins = styled.div`
    display: flex;
    flex-direction: row;
    margin-right: 8px;
    align-items: center;
    div {
        display: flex;
        flex-direction: row;    
        padding: 0.5rem;
        background: ${props => props.theme.colors.color_600};
        border-radius: 4px;
        margin-right: 4px;
    }
    p {
        font-size: 0.71875rem;
    }
    `;

export const AsfCash = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    div {
        display: flex;
        flex-direction: row;
        padding: 0.5rem;
        background: ${props => props.theme.colors.color_800};
        border-radius: 4px;
        margin-right: 4px;
    }
    p {
        font-size: 0.71875rem;
    }
`;