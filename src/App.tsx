import { ThemeProvider } from "styled-components"
import { defaultTheme } from "./styles/themes/default"
import { GlobalStyle } from "./styles/themes/global"
import { Routers } from "./Routers"
import { BrowserRouter } from "react-router-dom"


export function App() {

  return (
    <ThemeProvider theme={defaultTheme}>
        <BrowserRouter>
          <Routers/>
        </BrowserRouter>
        <GlobalStyle/>
    </ThemeProvider>
  )
}

