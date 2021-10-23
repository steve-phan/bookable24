import { Container } from "@mui/material"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { ThemeProvider as ThemeProviderSt } from "styled-components"
import { graphql, useStaticQuery } from "gatsby"
import * as React from "react"
import Footer from "../Footer/Footer"
import Header from "../Header"
import { BodySt } from "./Layout.css"
import "./reset.css"

const theme = createTheme({
  color: {
    primary: "#f05123",
    secondary: "#1473e6",
    warning: "#d1cec3",
    white: "#ffffff",
    gray: "#666",
    text: "#202124",
    invalid: "#f33a58",
    background: "#f3f3f3ee",
    black: "#000000",
    activeBackground: "#fff1f9",
    activeColor: "deeppink",
    iconColor: "#e84b63",
  },
})

const Layout = ({ children, location }: any) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <ThemeProvider theme={theme}>
      <ThemeProviderSt theme={theme}>
        <Container
          style={{
            padding: 0,
          }}
          disableGutters
          maxWidth={false}
        >
          <Header
          // siteTitle={data.site.siteMetadata?.title || `Title`}
          // location={location}
          />
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
