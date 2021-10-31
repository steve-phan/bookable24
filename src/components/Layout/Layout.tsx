import { ThemeProvider as ThemeProviderSt } from "styled-components"
import { Container } from "@mui/material"
import { ThemeProvider } from "@mui/material/styles"
import React, { useEffect } from "react"
import CssBaseline from "@mui/material/CssBaseline"
import GlobalStyles from "@mui/material/GlobalStyles"
import { useI18next } from "gatsby-plugin-react-i18next"

import { useShopname } from "src/components/Account/accountHook"
import { useAppDispatch, useAppSelector } from "src/store/hooks"
import { checkUserAuth, setShopLogout } from "src/store/shop/shopSlice"
import { theme, globalStyles } from "src/theme"

import Footer from "./Footer/Footer"
import Header from "./Header"
import { BodySt } from "./Layout.css"
// import "./reset.css"
import Loading from "../Loading/Loading"

export const inputGlobalStyles = <GlobalStyles styles={globalStyles} />

const Layout = ({ children, location, isShop }: any) => {
  const dispatch = useAppDispatch()
  const { isShopLogin, status } = useAppSelector(state => state.shop)

  const shopList = useShopname()
  const { navigate } = useI18next()

  // useEffect(() => {
  //   if (!isShopLogin && !isShop) {
  //     console.log("check shop auth")
  //     dispatch(checkUserAuth(shopList))
  //   } else {
  //     console.log("khiung hay ma")
  //     dispatch(setShopLogout())
  //   }
  // }, [])
  useEffect(() => {
    // const paths = location?.pathname?.split("/").pop() !== 'login'
    if (!isShopLogin && location?.pathname?.split("/").pop() !== "login") {
      dispatch(checkUserAuth(shopList))
    }
  }, [])
  // useEffect(() => {
  //   if (!isShopLogin && status === "logout") {
  //     navigate("/login")
  //   }
  // }, [status])

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
          }}
          disableGutters
          maxWidth={false}
        >
          {/* {status === "loading" && <Loading />} */}
          <Header
            // siteTitle={data.site.siteMetadata?.title || `Title`}
            // location={location}
            isShopLogin={isShopLogin}
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
