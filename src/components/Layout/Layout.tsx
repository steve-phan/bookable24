/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

// @material-ui
import { Container, Hidden } from "@material-ui/core"
import { createTheme, MuiThemeProvider } from "@material-ui/core/styles"
import { graphql, useStaticQuery } from "gatsby"
import * as React from "react"
import { ThemeProvider } from "styled-components"
import Footer from "../Footer/Footer"
import Header from "../Header"
import SideBarMenu from "../SideBarMenu/SideBarMenu"
import { BodySt, MainSt } from "./Layout.css"
import "./reset.css"

const theme = createTheme({
  color: {
    primary: "#f05123",
    white: "#ffffff",
    gray: "#666",
    text: "#202124",
    invalid: "#f33a58",
    background: "#006482",
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
    <MuiThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
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
      </ThemeProvider>
    </MuiThemeProvider>
  )
}

export default Layout
