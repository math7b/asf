import styled from "styled-components";

export const HeaderContainer = styled.div`
    display: flex;
    align-items: start;
    justify-content: space-between;
    background: ${props => props.theme.colors.color_400};
    margin-bottom: 8vh;
    height: 11vh;
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
        width: 14vh;  /* A largura pode ser ajustada conforme necessário */
        height: auto;
        position: relative;
        top: 3vh; /* Ajuste a quantidade conforme necessário */
        left: -3vh; /* Ajuste a quantidade conforme necessário */
    }
    p {
        position: relative;
        left: -6vh;
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