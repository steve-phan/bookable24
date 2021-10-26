import React, { useContext } from "react"
import classNames from "classnames"
// @mui/material components
import { makeStyles } from "@mui/styles"
import Drawer from "@mui/material/Drawer"
import Hidden from "@mui/material/Hidden"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import Icon from "@mui/material/Icon"
import Logo from "src/components/Logo"

import { routes } from "./routes"
import { WrapSideBarSt } from "./dashboard.css"
import { NavLinks } from "../NavLinks/Navlinks"

import { IMobileToggle } from "./"
import MobileMenu from "../NavLinks/MobileMenu"

const SideBar = ({ mobileOpen, handleDrawerToggle }: IMobileToggle) => {
  return (
    <WrapSideBarSt>
      <MobileMenu
        handleDrawerToggle={handleDrawerToggle}
        mobileOpen={mobileOpen}
        routes={routes}
      />

      <Hidden mdDown implementation="css">
        <Drawer anchor="left" variant="permanent" open>
          <MobileMenu isDesktop routes={routes} />
        </Drawer>
      </Hidden>
    </WrapSideBarSt>
  )
}

export default SideBar
