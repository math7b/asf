import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
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
        color: #333;
    }

    body, imput, textare, button {
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
        font-size: 1rem;
    }

    button {
        border: 1px solid #777;
        border-radius: 8px;
        font-size: 0.875rem;
    }
`