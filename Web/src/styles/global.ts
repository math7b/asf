import styled, { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    :focus {
        outline: transparent;
        box-shadow: 0 0 0 0.5px ${props => props.theme.colors.color_600};
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        background: url(
            https://images.unsplash.com/photo-1598368095175-13b807fa0895?w=1366&h=768&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YWJlbGhhc3xlbnwwfHwwfHx8MA%3D%3D
        );
        background-size: 100vw 100vh;
        background-attachment: fixed;
        background-repeat: no-repeat;
    }

    a{
        text-decoration: none;
        color: ${props => props.theme.texts.test_950};
    }

    body, imput, textare, button {
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
        font-size: 1rem;
    }

    button {
        border: 0px;
        border-radius: 8px;
        font-size: 0.875rem;
        margin-right: 8px;

        background: ${props => props.theme.texts.text_300};
        color: ${props => props.theme.texts.text_950};

        &:hover {
            cursor: pointer;
            color: ${props => props.theme.colors.color_800};
        }
    }
`

export const Container = styled.main`
    flex: 1;
    
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 100%;
    max-width: 1012px;
    margin-left: auto;
    margin-right: auto;

    padding: 1rem 1rem 2rem 1rem;

    background: ${props => props.theme.colors.color_white_opack};
    border-radius: 4px 4px 0px 0px;
`

export const Post = styled.div`
    display: flex;
    flex: content;
    width: 100%;
    &:not(:first-child) {
        padding-top: 16px;
        margin-top: 16px;
    }
`
