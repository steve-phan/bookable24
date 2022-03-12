import * as React from "react"
import { ThemeProvider as ThemeProviderSt } from "styled-components"
import { Container } from "@mui/material"
import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import GlobalStyles from "@mui/material/GlobalStyles"

import { useAppSelector } from "src/store/hooks"
import { theme, globalStyles } from "src/theme"

import Footer from "./Footer/Footer"
import Header from "./Header"
import { BodySt } from "./Layout.css"
import { RootState } from "src/store/store"
import { PageProps } from "gatsby"

export const inputGlobalStyles = <GlobalStyles styles={globalStyles} />

const Layout = ({ children, location }: PageProps) => {
  const { isShopLogin } = useAppSelector((state: RootState) => state.shop)

  return (
    <ThemeProvider theme={theme}>
      <ThemeProviderSt theme={theme}>
        <CssBaseline />
        {inputGlobalStyles}
        <Container
          style={{
            padding: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minHeight: "100vh",
          }}
          disableGutters
          maxWidth={false}
        >
          <Header location={location} isShopLogin={isShopLogin} />
          <BodySt>
            <Container disableGutters>{children}</Container>
          </BodySt>
          <Footer />
        </Container>
      </ThemeProviderSt>
    </ThemeProvider>
  )
}

export default Layout
