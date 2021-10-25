import React from "react"
import classNames from "classnames"
import PropTypes from "prop-types"

import { makeStyles } from "@mui/styles"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import Hidden from "@mui/material/Hidden"
import Menu from "@mui/icons-material/Menu"
import { Button } from "@mui/material"

import { AppBarSt } from "./Header.css"
import Logo from "src/components/Logo"
import LangSelect from "../../LangSelect"

import { IMobileToggle } from "../"

//hooks
// import { useRouteName } from 'hooks';

// import styles from "../../themes/components/headerStyle"
// import NavBarLinks from "./NavBarLinks"
// import { useRouteName } from "../hooks"
// import { ShopContext } from '../../context/contextShop';

// const useStyles = makeStyles(styles)

export default function Header({
  mobileOpen,
  handleDrawerToggle,
}: IMobileToggle) {
  // const classes = useStyles()
  // const routeName = useRouteName()
  // const { color } = props;
  // const appBarClasses = classNames({
  //   [" " + classes[color]]: color,
  // })
  // const [{ isShopLogged, email, allTermins, terminIsLoaded }, dispatch] =
  //   React.useContext(ShopContext);

  return (
    <AppBarSt position="fixed" color="default">
      <Toolbar
        style={{
          justifyContent: "space-between",
        }}
      >
        <Logo />

        {/* Here we create navbar brand, based on route name */}
        <Button href="#">
          {/* {routeName} */}
          Online Booking System
          {/* BookAble24 */}
        </Button>

        <Hidden mdUp implementation="css">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
          >
            <Menu />
          </IconButton>
        </Hidden>
        <Hidden mdDown>
          <LangSelect />
        </Hidden>
      </Toolbar>
    </AppBarSt>
  )
}
