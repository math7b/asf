import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    :focus {
        outline: 0;
        box-shadow: 0 0 0 2px #7C7C8A;
    }

    body {
        background: url(
            https://images.unsplash.com/photo-1598368095175-13b807fa0895?w=1366&h=768&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YWJlbGhhc3xlbnwwfHwwfHx8MA%3D%3D
        );
        background-size: 100vw 100vh;
        background-attachment: fixed;
        background-repeat: no-repeat;
    }

    body, imput, textare, button {
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
        font-size: 1rems;
    }
`