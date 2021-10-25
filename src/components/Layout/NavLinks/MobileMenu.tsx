import React from "react"
import Drawer from "@mui/material/Drawer"
import Hidden from "@mui/material/Hidden"
import { useTranslation } from "gatsby-plugin-react-i18next"
import { signOut } from "firebase/auth"

import { useAppDispatch, useAppSelector } from "src/store/hooks"
import { setShopLogout } from "src/store/shop/shopSlice"
import { auth } from "src/firebase"

import LangSelect from "../LangSelect"
import { LoginButton } from "../Header/Header.css"
import { WrapLoginMobileSt, BackgroundSt, DrawerSt } from "./NavLinks.css"
import { MobileNavLinks } from "./MobileNavLink"
import { IMobileToggle } from "src/components/Layout/DasBoadLayout"

export interface IMobileMenu extends IMobileToggle {
  isDesktop?: boolean
  routes?: any
}

const MobileMenu = ({
  isDesktop,
  mobileOpen,
  handleDrawerToggle,
  routes,
}: IMobileMenu) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { isShopLogin } = useAppSelector(state => state.shop)
  return (
    <>
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
              <LoginButton
                onClick={async () => {
                  try {
                    await signOut(auth)

                    dispatch(setShopLogout())
                    console.log("signout success")
                  } catch (error) {
                    console.log("signout failed")
                  }
                }}
                to="/login"
              >
                {t("account.logout", "Logout")}{" "}
              </LoginButton>
            ) : (
              <LoginButton
                onClick={async () => {
                  try {
                    await signOut(auth)

                    console.log("signout success")
                    dispatch(setShopLogout())
                  } catch (error) {
                    console.log("signout failed")
                  }
                }}
                to="/login"
              >
                {t("account.login", "Login")}{" "}
              </LoginButton>
            )}
            <LangSelect />
          </WrapLoginMobileSt>
          <MobileNavLinks routes={routes} />
        </DrawerSt>
      </Hidden>
      {isDesktop && (
        <>
          <BackgroundSt />
          <WrapLoginMobileSt>
            {isShopLogin ? (
              <LoginButton
                onClick={() => dispatch(setShopLogout())}
                to="/login"
              >
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
        </>
      )}
    </>
  )
}

export default MobileMenu
