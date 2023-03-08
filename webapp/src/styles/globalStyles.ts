import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
        font-family: sans-serif;
    }

    @font-face {
        font-family: MuseoModernoRegular;
        src: url('/fonts/MuseoModerno-Regular.woff');
    }

    @font-face {
        font-family: Exo2Bold;
        src: url('/fonts/Exo2-Bold.ttf');
    }
`

export default GlobalStyle
