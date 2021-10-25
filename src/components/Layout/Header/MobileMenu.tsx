import React from "react"
import Drawer from "@mui/material/Drawer"
import Hidden from "@mui/material/Hidden"
import Box from "@mui/material/Box"
import { useTheme, ThemeOptions } from "@mui/material/styles"
import { makeStyles } from "@mui/styles"
import { Link, useTranslation } from "gatsby-plugin-react-i18next"
import { StaticImage } from "gatsby-plugin-image"

import LangSelect from "./LangSelect"
import { routes } from "../../../routes"
import { WrapLoginSt, LoginButton, LinkItemSt } from "./Header.css"

const useStyles = makeStyles(theme => ({
  wrap: {
    position: "relative",
  },
  smallBox: {
    minWidth: 275,
    paddingTop: 30,
    display: "grid",
    placeItems: "center",
  },
  navLinks: {
    paddingTop: 30,
  },
  background: {
    position: "absolute",
    inset: 0,
    zIndex: -1,
    opacity: 0.6,
  },
  item: {},
}))

const MobileMenu = ({ mobileOpen, handleDrawerToggle }: any) => {
  const classes = useStyles()
  const theme = useTheme<ThemeOptions>()
  const { t } = useTranslation()

  const MobileNavLink = () => {
    return (
      <div className={classes.navLinks}>
        {routes.map((route, i) => (
          <LinkItemSt
            key={i}
            activeStyle={{
              backgroundColor: "#f5f5f5",
              color: theme.color.text,
              borderTopLeftRadius: 16,
              borderBottomLeftRadius: 16,
            }}
            to={route.path}
          >
            <route.icon /> {t(`menu.${route.name}`)}
          </LinkItemSt>
        ))}
      </div>
    )
  }
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
        className={classes.wrap}
      >
        <StaticImage
          src="../../images/background.jpg"
          alt="Bookable24 Background"
          className={classes.background}
        />

        <WrapLoginSt>
          <LoginButton to="/login">{t("account.login")} </LoginButton>
          <LangSelect />
        </WrapLoginSt>

        <Box>
          <MobileNavLink />
        </Box>
      </Drawer>
    </Hidden>
  )
}

export default MobileMenu
