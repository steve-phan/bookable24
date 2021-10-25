import { ThemeProvider as ThemeProviderSt } from "styled-components"
import { Container } from "@mui/material"
import { ThemeProvider } from "@mui/material/styles"
import React, { useEffect } from "react"

import { useShopname } from "src/components/Account/accountHook"
import { useAppDispatch, useAppSelector } from "src/store/hooks"
import { checkUserAuth } from "src/store/shop/shopSlice"
import { theme } from "src/utils"

import Footer from "./Footer/Footer"
import Header from "./Header"
import { BodySt } from "./Layout.css"
import "./reset.css"

const Layout = ({ children, location }: any) => {
  const dispatch = useAppDispatch()
  const { isShopLogin } = useAppSelector(state => state.shop)

  const shopList = useShopname()

  useEffect(() => {
    if (!isShopLogin) {
      dispatch(checkUserAuth(shopList))
    }
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <ThemeProviderSt theme={theme}>
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
