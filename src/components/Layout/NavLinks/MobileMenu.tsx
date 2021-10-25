import React from "react"
import Drawer from "@mui/material/Drawer"
import Hidden from "@mui/material/Hidden"
import { useTranslation } from "gatsby-plugin-react-i18next"

import LangSelect from "../LangSelect"
import {
  WrapLoginMobileSt,
  LoginButton,
  BackgroundSt,
} from "../Header/Header.css"
import { MobileNavLinks } from "./MobileNavLink"

const MobileMenu = ({ mobileOpen, handleDrawerToggle, routes }: any) => {
  const { t } = useTranslation()
  return (
    <Hidden mdUp implementation="css">
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        <BackgroundSt />
        <WrapLoginMobileSt>
          <LoginButton to="/login">{t("account.login", "Login")} </LoginButton>
          <LangSelect />
        </WrapLoginMobileSt>
        <MobileNavLinks routes={routes} />
      </Drawer>
    </Hidden>
  )
}

export default MobileMenu
