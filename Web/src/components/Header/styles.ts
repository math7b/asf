import styled from "styled-components";

export const HeaderContainer = styled.div`
    display: flex;
    align-items: start;
    justify-content: space-between;
    flex-wrap: wrap;
    background: ${props => props.theme.colors.color_400};
    margin-bottom: 8vh;
    height: 4rem;
    p, h4 {
        margin: 0;
        padding: 0;
    }
    div {
        display: flex;
        margin-right:16px;
        height: 100%;
        a {
            padding: 1rem;
        }
        svg {
            height: 100%;
            align-items: center;
        }
        a h4{
            height: 100%;
            display: flex;
            align-items: center;
            padding: 0.5rem;
        }
    }
`;

export const Logo = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    a img {
        width: 6rem;
        height: auto;
        margin-top: 60px;
        margin-left: -20px;
        /* position: relative;
        top: 4vh;
        left: -2vw; */
    }
    p {
        /* position: relative; */
        /* left: -3vw; */
        margin-left: -10px;
        font-size: 0.75rem;
    }
`;

export const Coins = styled.div`
    display: flex;
    align-items: center;
    p {
        margin-left: 0.5rem;
    }
    p:not(:last-child) {
        margin-right: 0.75rem;
    }
`;

export const ASFCoins = styled.span`
    background: ${props => props.theme.colors.color_200};
    width: 24px;
    height: 24px;
    border-radius: 4px;
    `;

export const ASFCash = styled.span`
    background: ${props => props.theme.colors.color_600};
    width: 24px;
    height: 24px;
    border-radius: 4px;
`;