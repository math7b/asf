import styled from "styled-components";

export const HeaderContainer = styled.div`
    display: flex;
    align-items: start;
    
    background: ${props => props.theme.colors.color_400};
    margin-bottom: 8vh;
    height: 11vh;
    div {
        flex: 1;
        display: flex;
        justify-content: space-between;
        
        margin: 0px 16px 0px 16px;
        height: 100%;
        
        a img {
            width: 14vh;
            height: auto;
        }
    
        svg {
            height: 100%;
            align-items: center;
        }
    }
`