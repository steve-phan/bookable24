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
// core components
import Logo from "../../Logo"

const SideBar = () => {
  // verifies if routeName is the one active (in browser input)
  // function activeRoute(routeName) {
  //   return location.pathname === routeName
  // }
  // const Links = ({ isMobile }) => (
  //   <List className={classes.list}>
  //     {routes.map((prop, key) => {
  //       var activePro = " "
  //       var listItemClasses

  //       listItemClasses = classNames({
  //         [" " + classes[color]]: activeRoute(prop.layout + prop.path),
  //       })

  //       const whiteFontClasses = classNames({
  //         [" " + classes.whiteFont]: activeRoute(prop.layout + prop.path),
  //       })
  //       return (
  //         <NavLink
  //           to={prop.layout + prop.path}
  //           className={activePro + classes.item}
  //           activeClassName="active"
  //           key={key}
  //           onClick={async () => {
  //             if (isMobile) {
  //               props.handleDrawerToggle()
  //             }
  //             if (prop.path === "/") {
  //               await firebase.auth().signOut()
  //               dispatch({
  //                 type: shopTypes.SHOP_LOGOUT,
  //               })
  //               history.push("/login")
  //             }
  //           }}
  //         >
  //           <ListItem button className={classes.itemLink + listItemClasses}>
  //             {typeof prop.icon === "string" ? (
  //               <Icon
  //                 className={classNames(classes.itemIcon, whiteFontClasses, {
  //                   [classes.itemIconRTL]: props.rtlActive,
  //                 })}
  //               >
  //                 {prop.icon}
  //               </Icon>
  //             ) : (
  //               <prop.icon
  //                 className={classNames(classes.itemIcon, whiteFontClasses, {
  //                   [classes.itemIconRTL]: props.rtlActive,
  //                 })}
  //               />
  //             )}
  //             <ListItemText
  //               primary={props.rtlActive ? prop.rtlName : prop.name}
  //               className={classNames(classes.itemText, whiteFontClasses, {
  //                 [classes.itemTextRTL]: props.rtlActive,
  //               })}
  //               disableTypography={true}
  //             />
  //           </ListItem>
  //         </NavLink>
  //       )
  //     })}
  //   </List>
  // )

  return (
    <div>
      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          anchor="right"
          // open={props.open}
          // classes={{
          //   paper: classNames(classes.drawerPaper, {
          //     [classes.drawerPaperRTL]: props.rtlActive,
          //   }),
          // }}
          // onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {/* <h1>Hello Sidebar</h1> */}
          {/* {brand} */}
          <Logo />
          <div>{/* <Links isMobile />{" "} */}</div>
          {/* {image !== undefined ? (
            <div style={{ backgroundImage: "url(" + image + ")" }} />
          ) : null} */}
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          anchor="left"
          variant="permanent"
          open
          // classes={{
          //   paper: classNames(classes.drawerPaper, {
          //     [classes.drawerPaperRTL]: props.rtlActive,
          //   }),
          // }}
        >
          <Logo />
          <div> {/* <Links /> */}</div>
          {/* {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null} */}
        </Drawer>
      </Hidden>
    </div>
  )
}

export default SideBar
