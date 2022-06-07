import AppBar from "@mui/material/AppBar"
import Hidden from "@mui/material/Hidden"
import IconButton from "@mui/material/IconButton"
import Toolbar from "@mui/material/Toolbar"
import Menu from "@mui/icons-material/Menu"
import { useTranslation } from "gatsby-plugin-react-i18next"
import React from "react"

import { routes } from "../routes"
import Logo from "../../ContentComponents/Logo"
import { CTAButtons, WrapLoginSt, DashBoardButtonSt } from "./Header.css"
import LangSelect from "../LangSelect"
import MobileMenu from "../NavLinks/MobileMenu"
import { NavLinks } from "../NavLinks/Navlinks"

interface IHeaderProps {
  isShopLogin: boolean | undefined
  location: any
  isShop?: boolean
}

const HeaderComponent: React.FC<IHeaderProps> = ({
  isShopLogin,
  location,
  isShop,
}) => {
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const { t } = useTranslation()
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }
  console.log({ isShop })
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
            {!isShop && (
              <>
                {isShopLogin && !location?.pathname?.includes("/login") ? (
                  <DashBoardButtonSt to="/dashboard">
                    {t("menu.DashBoard", "DashBoard")}
                  </DashBoardButtonSt>
                ) : (
                  <CTAButtons to="/login">
                    {t("account.login", "Login")}
                  </CTAButtons>
                )}
              </>
            )}

            <LangSelect />
          </WrapLoginSt>
        </Hidden>
        <MobileMenu
          handleDrawerToggle={handleDrawerToggle}
          mobileOpen={mobileOpen}
          routes={routes}
          isShop={isShop}
        />
        <Hidden mdUp>
          <div>
            {!isShop && (
              <>
                {isShopLogin && !location?.pathname?.includes("/login") && (
                  <DashBoardButtonSt to="/dashboard">
                    {t("menu.DashBoard", "DashBoard")}
                  </DashBoardButtonSt>
                )}
              </>
            )}
            <IconButton color="inherit" edge="end" onClick={handleDrawerToggle}>
              <Menu />
            </IconButton>
          </div>
        </Hidden>
      </Toolbar>
    </AppBar>
  )
}

export default HeaderComponent
