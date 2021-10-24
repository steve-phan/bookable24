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

//hooks
// import { useRouteName } from 'hooks';

import styles from "../../themes/components/headerStyle"
import NavBarLinks from "./NavBarLinks"
import { useRouteName } from "../hooks"
// import { ShopContext } from '../../context/contextShop';

const useStyles = makeStyles(styles)

export default function Header(props) {
  const classes = useStyles()
  const routeName = useRouteName()
  // const { color } = props;
  const color = "info"
  const appBarClasses = classNames({
    [" " + classes[color]]: color,
  })
  // const [{ isShopLogged, email, allTermins, terminIsLoaded }, dispatch] =
  //   React.useContext(ShopContext);
  return (
    <AppBar>
      <Toolbar>
        {
          <div className={classes.flex}>
            {/* Here we create navbar brand, based on route name */}
            <Button href="#" className={classes.title}>
              {/* {routeName} */}
              Online Booking System
              {/* BookAble24 */}
            </Button>
          </div>
        }
        <Hidden smDown implementation="css">
          <NavBarLinks />
        </Hidden>
        <Hidden mdUp implementation="css">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={props.handleDrawerToggle}
          >
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  )
}
