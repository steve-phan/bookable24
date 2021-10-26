import React, { useMemo } from "react"
import Drawer from "@mui/material/Drawer"
import Hidden from "@mui/material/Hidden"
import { useTranslation, useI18next } from "gatsby-plugin-react-i18next"
import { signOut } from "firebase/auth"

import { useAppDispatch, useAppSelector } from "src/store/hooks"
import { setShopLogout } from "src/store/shop/shopSlice"
import { auth } from "src/firebase"

import LangSelect from "../LangSelect"
import { LoginButton } from "../Header/Header.css"
import {
  WrapLoginMobileSt,
  BackgroundSt,
  DrawerSt,
  CTAButtonAccountSt,
} from "./NavLinks.css"
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
  const { navigate } = useI18next()
  const dispatch = useAppDispatch()
  const { isShopLogin } = useAppSelector(state => state.shop)
  const MemoBackground = useMemo(() => <BackgroundSt />, [])
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
            <CTAButtonAccountSt
              onClick={async () => {
                try {
                  if (isShopLogin) {
                    await signOut(auth)
                    dispatch(setShopLogout())
                    navigate("/login")
                  }
                } catch (error) {
                  alert("Try Again")
                }
              }}
            >
              {isShopLogin
                ? t("account.logout", "Logout")
                : t("account.login", "Login")}
            </CTAButtonAccountSt>
            <LangSelect />
          </WrapLoginMobileSt>
          <MobileNavLinks routes={routes} />
        </DrawerSt>
      </Hidden>
      {isDesktop && (
        <>
          {MemoBackground}
          {/* <BackgroundSt /> */}
          <WrapLoginMobileSt>
            <CTAButtonAccountSt
              onClick={async () => {
                try {
                  if (isShopLogin) {
                    await signOut(auth)
                    dispatch(setShopLogout())
                    navigate("/login")
                  }
                } catch (error) {
                  alert("Try Again")
                }
              }}
            >
              {isShopLogin
                ? t("account.logout", "Logout")
                : t("account.login", "Login")}
            </CTAButtonAccountSt>
            <LangSelect />
          </WrapLoginMobileSt>
          <MobileNavLinks routes={routes} />
        </>
      )}
    </>
  )
}

export default MobileMenu
