import ClickAwayListener from "@mui/material/ClickAwayListener"
import Divider from "@mui/material/Divider"
import Grow from "@mui/material/Grow"
import Hidden from "@mui/material/Hidden"
import MenuItem from "@mui/material/MenuItem"
import MenuList from "@mui/material/MenuList"
import Paper from "@mui/material/Paper"
import Poppers from "@mui/material/Popper"
// @mui/material components
import { makeStyles } from "@mui/styles"
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline"
import Notifications from "@mui/icons-material/Notifications"
// @mui/icons-material
import Person from "@mui/icons-material/Person"
import Search from "@mui/icons-material/Search"
import classNames from "classnames"
import React from "react"
import { useHistory } from "react-router-dom"

import { ShopContext } from "../../context/contextShop"
import { shopTypes } from "../../context/contextShop/shopTypes"
import firebase from "../../firebase"
import styles from "../../themes/components/headerLinksStyle"
import { timeAgo } from "../../utils"
import Button from "../custom/CustomButtons/Button"
// core components
import CustomInput from "../custom/CustomInput/CustomInput"
import SnackbarContent from "../custom/Snackbar/SnackbarContent"

const useStyles = makeStyles(styles)

export default function AdminNavbarLinks() {
  const history = useHistory()
  const classes = useStyles()
  const [openNotification, setOpenNotification] = React.useState(null)
  const [openProfile, setOpenProfile] = React.useState(null)
  const [{ isShopLogged, email, allTermins, terminIsLoaded }, dispatch] =
    React.useContext(ShopContext)

  // console.log(allTermins);
  const penddingTermins =
    !!allTermins && allTermins.filter(termin => !termin.status)

  const handleClickNotification = event => {
    if (openNotification && openNotification.contains(event.target)) {
      setOpenNotification(null)
    } else {
      setOpenNotification(event.currentTarget)
    }
  }
  const handleCloseNotification = () => {
    setOpenNotification(null)
  }
  const handleClickProfile = event => {
    if (openProfile && openProfile.contains(event.target)) {
      setOpenProfile(null)
    } else {
      setOpenProfile(event.currentTarget)
    }
  }
  const handleCloseProfile = () => {
    setOpenProfile(null)
  }
  const handleUserSignOut = async () => {
    firebase.auth().signOut()
    dispatch({
      type: shopTypes.SHOP_LOGOUT,
    })
    setOpenProfile(null)
    history.push("/login")
  }

  return (
    <div>
      <div className={classes.searchWrapper}>
        <CustomInput
          formControlProps={{
            className: classes.margin + " " + classes.search,
          }}
          inputProps={{
            placeholder: "Search",
            inputProps: {
              "aria-label": "Search",
            },
          }}
        />
        <Button color="white" aria-label="edit" justIcon round>
          <Search />
        </Button>
      </div>

      <div className={classes.manager}>
        <Button
          color={window.innerWidth > 959 ? "transparent" : "white"}
          justIcon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          aria-owns={openNotification ? "notification-menu-list-grow" : null}
          aria-haspopup="true"
          onClick={handleClickNotification}
          className={classes.buttonLink}
        >
          <Notifications className={classes.icons} />
          <span className={classes.notifications}>
            {penddingTermins.length}{" "}
          </span>
          <Hidden mdUp implementation="css">
            <p onClick={handleCloseNotification} className={classes.linkText}>
              Notification
            </p>
          </Hidden>
        </Button>
        <Poppers
          open={Boolean(openNotification)}
          anchorEl={openNotification}
          transition
          disablePortal
          className={
            classNames({ [classes.popperClose]: !openNotification }) +
            " " +
            classes.popperNav
          }
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="notification-menu-list-grow"
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleCloseNotification}>
                  <MenuList role="menu">
                    <h4 className={classes.dropdownTitle}>Notifications</h4>
                    {penddingTermins.map(termin => (
                      <MenuItem
                        key={termin._id}
                        // onClick={handleCloseNotification}
                        className={classes.dropdownItem}
                      >
                        <SnackbarContent
                          message={`${termin.first_name} ${termin.last_name} đã đặt bàn mới. Vui lòng kiểm tra cụ thể!`}
                          icon={CheckCircleOutlineIcon}
                          timeAgo={timeAgo(termin.created_at)}
                          termin={termin}
                        />
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Poppers>
      </div>
      <div className={classes.manager}>
        <Button
          color={window.innerWidth > 959 ? "transparent" : "white"}
          justIcon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          aria-owns={openProfile ? "profile-menu-list-grow" : null}
          aria-haspopup="true"
          onClick={handleClickProfile}
          className={classes.buttonLink}
        >
          <Person className={classes.icons} />
          <Hidden mdUp>
            <p className={classes.linkText}>Profile</p>
          </Hidden>
        </Button>
        <Poppers
          open={Boolean(openProfile)}
          anchorEl={openProfile}
          transition
          disablePortal
          className={
            classNames({ [classes.popperClose]: !openProfile }) +
            " " +
            classes.popperNav
          }
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="profile-menu-list-grow"
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleCloseProfile}>
                  <MenuList role="menu">
                    <MenuItem
                      onClick={handleCloseProfile}
                      className={classes.dropdownItem}
                    >
                      Profile
                    </MenuItem>
                    <MenuItem
                      onClick={handleCloseProfile}
                      className={classes.dropdownItem}
                    >
                      Settings
                    </MenuItem>
                    <Divider light />
                    <MenuItem
                      onClick={handleUserSignOut}
                      className={classes.dropdownItem}
                    >
                      Logout
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Poppers>
      </div>
    </div>
  )
}
