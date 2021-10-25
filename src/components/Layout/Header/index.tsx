// import { Link } from "gatsby"
import AppBar from "@mui/material/AppBar"
import Hidden from "@mui/material/Hidden"
import IconButton from "@mui/material/IconButton"
import Toolbar from "@mui/material/Toolbar"
// @material-ui/icons
import Menu from "@mui/icons-material/Menu"
import { makeStyles, useTheme } from "@mui/styles"
import { Link, useTranslation } from "gatsby-plugin-react-i18next"
import { ThemeOptions } from "@mui/material"
// import { Link } from "gatsby"
import React from "react"
import { routes } from "../../../routes"
import Logo from "../../Logo"
import { PageLinkSt, CTAButtons } from "./Header.css"
import LangSelect from "./LangSelect"
import MobileMenu from "./MobileMenu"

// Styled-component Overidde

const useStyles = makeStyles(() => ({
  container: {
    justifyContent: "space-between",
  },
  sidebarWrapper: {},
  menuIcon: {
    marginLeft: "auto",
  },
  navLinks: {
    marginLeft: "auto",
  },
}))

const HeaderComponent: React.FC = ({ location }: any) => {
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const { t } = useTranslation()
  const classes = useStyles()
  const theme = useTheme<ThemeOptions>()
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }
  const NavLink = () => {
    return (
      <div className={classes.navLinks}>
        {routes.map((route, i) => (
          <React.Fragment key={i}>
            <PageLinkSt
              activeStyle={{
                // background: theme.color.activeBackground,
                color: theme.color.primary,
                borderBottom: `2px solid ${theme.color.primary}`,
              }}
              to={route.path}
            >
              {t(`menu.${route.name}`)}
            </PageLinkSt>
          </React.Fragment>
        ))}
      </div>
    )
  }

  return (
    <AppBar position="fixed" color="default">
      <Toolbar className={classes.container}>
        <Logo />

        <Hidden mdDown>
          <NavLink />
          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              alignItems: "center",
            }}
          >
            <CTAButtons to="/login">{t("account.login")} </CTAButtons>
            <LangSelect />
          </div>
        </Hidden>
        <MobileMenu
          handleDrawerToggle={handleDrawerToggle}
          mobileOpen={mobileOpen}
        />
        <Hidden mdUp>
          <IconButton
            className={classes.menuIcon}
            color="inherit"
            edge="end"
            onClick={handleDrawerToggle}
          >
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  )
}

export default HeaderComponent
