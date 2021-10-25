// import { Link } from "gatsby"
import AppBar from "@mui/material/AppBar"
import Hidden from "@mui/material/Hidden"
import IconButton from "@mui/material/IconButton"
import Toolbar from "@mui/material/Toolbar"
// @material-ui/icons
import Menu from "@mui/icons-material/Menu"
import { Link, useTranslation } from "gatsby-plugin-react-i18next"

import React from "react"
import { routes } from "../routes"
import Logo from "../../Logo"
import { CTAButtons, WrapLoginSt } from "./Header.css"
import LangSelect from "../LangSelect"
import MobileMenu from "../NavLinks/MobileMenu"
import { NavLinks } from "../NavLinks/Navlinks"

// Styled-component Overidde

const HeaderComponent: React.FC = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const { t } = useTranslation()
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }
  return (
    <AppBar position="fixed" color="default">
      <Toolbar
        style={{
          justifyContent: "space-between",
        }}
      >
        <Logo />
        <Hidden mdDown>
          <NavLinks routes={routes} />
          <WrapLoginSt>
            <CTAButtons to="/login">{t("account.login")} </CTAButtons>
            <LangSelect />
          </WrapLoginSt>
        </Hidden>
        <MobileMenu
          handleDrawerToggle={handleDrawerToggle}
          mobileOpen={mobileOpen}
          routes={routes}
        />
        <Hidden mdUp>
          <IconButton color="inherit" edge="end" onClick={handleDrawerToggle}>
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  )
}

export default HeaderComponent
