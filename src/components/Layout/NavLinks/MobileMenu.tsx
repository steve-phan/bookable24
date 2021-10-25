import React from "react"
import Drawer from "@mui/material/Drawer"
import Hidden from "@mui/material/Hidden"
import { useTranslation } from "gatsby-plugin-react-i18next"

import { useAppDispatch, useAppSelector } from "src/store/hooks"
import { setShopLogout } from "src/store/shop/shopSlice"

import LangSelect from "../LangSelect"
import { LoginButton } from "../Header/Header.css"
import { WrapLoginMobileSt, BackgroundSt, DrawerSt } from "./NavLinks.css"
import { MobileNavLinks } from "./MobileNavLink"

const MobileMenu = ({ mobileOpen, handleDrawerToggle, routes }: any) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { isShopLogin } = useAppSelector(state => state.shop)
  return (
    <Hidden mdUp implementation="css">
      <DrawerSt
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
          {isShopLogin ? (
            <LoginButton onClick={() => dispatch(setShopLogout())} to="/login">
              {t("account.logout", "Logout")}{" "}
            </LoginButton>
          ) : (
            <LoginButton to="/login">
              {t("account.login", "Login")}{" "}
            </LoginButton>
          )}
          <LangSelect />
        </WrapLoginMobileSt>
        <MobileNavLinks routes={routes} />
      </DrawerSt>
    </Hidden>
  )
}

export default MobileMenu
