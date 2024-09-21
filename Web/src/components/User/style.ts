import styled from "styled-components";

export const HeaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 16%;
    margin: 0% 4%;
    background: ${props => props.theme.colors.color_white_opack};
    padding: 4px;
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
`;

export const PostInfo = styled.div``;

export const Titulo = styled.div``;

export const AsfCoins = styled.div``;