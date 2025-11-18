import { createGlobalStyle } from 'styled-components'
import { SWRConfig } from 'swr'
import Header from '../components/Header'

// Fetcher global para SWR
const fetcher = url => fetch(url).then(res => res.json())

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
    scrollbar-width: none;
  }

  html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    max-width: 100%;
    min-height: 100%;
    background: #050505;
    font-family: 'Raleway', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }

  #__next {
    min-height: 100vh;
  }

  code {
    font-family: 'Raleway', monospace, sans-serif;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  ::-webkit-scrollbar {
    width: 0;
    display: none;
  }
`

export default function App({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        fetcher,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        dedupingInterval: 60000, // 1 minuto
      }}
    >
      <GlobalStyle />
      <Header />
      <Component {...pageProps} />
    </SWRConfig>
  )
}
