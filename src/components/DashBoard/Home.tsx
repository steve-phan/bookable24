import React from "react"
// @material-ui/core components
import { makeStyles } from "@mui/styles"
// core components
import GridItem from "../custom/Grid/GridItem"
import GridContainer from "../custom/Grid/GridContainer"
import Table from "../custom/Table/Table"
import Card from "../custom/Card/Card"
import CardHeader from "../custom/Card/CardHeader"
import CardBody from "../custom/Card/CardBody"

import styles from "../../themes/components/tableStyle"
import { ShopContext } from "../../context/contextShop"
import { getTime, mappedTime, timeAgo } from "../../utils"
import moment from "moment"
import Notifications from "@material-ui/icons/Notifications"
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline"
import MenuItem from "@material-ui/core/MenuItem"
import MenuList from "@material-ui/core/MenuList"
import Container from "@material-ui/core/Container"
import SnackbarContent from "../custom/Snackbar/SnackbarContent"
import ClickAwayListener from "@material-ui/core/ClickAwayListener"
import TotalCustomer from "../Chart/TotalCustomer"
import TotalOders from "../Chart/TotalOder"
const useStyles = makeStyles(theme => ({
  ...styles(theme),
  dropdownItem: {
    fontSize: "13px",
    padding: "10px 0",
    margin: "0 5px",
    borderRadius: "2px",
    WebkitTransition: "all 150ms linear",
    MozTransition: "all 150ms linear",
    OTransition: "all 150ms linear",
    MsTransition: "all 150ms linear",
    transition: "all 150ms linear",
    display: "block",
    clear: "both",
    fontWeight: "400",
    lineHeight: "1.42857143",
    whiteSpace: "normal",
    height: "unset",
    minHeight: "unset",
    "&:hover": {
      backgroundColor: "#f1f1f1",

      "& div": {
        // backgroundColor: '#cecece',
      },
      // color: whiteColor,
      // ...primaryBoxShadow,
    },
  },
}))

export default function Home() {
  const [{ isShopLogged, email, allTermins, terminIsLoaded }, dispatch] =
    React.useContext(ShopContext)
  const classes = useStyles()

  // const tableData = allTermins
  //   ?.filter((item) => item.selectedDate === moment().format('DD-MM-YYYY'))
  //   .map((termin, i) => [
  //     i,
  //     `${termin.first_name} ${termin.last_name} (${termin.person})`,
  //     `${getTime(termin.selectedSlot)} ${moment(termin.selectedDate)}`,
  //     getDetails(termin?.require || '', termin?.phone),
  //   ]);
  console.log(allTermins)
  return (
    <div>
      <Card plain>
        <CardHeader plain color="primary">
          <h4 className={classes.cardTitleWhite}>Thông báo chung</h4>
          <p className={classes.cardCategoryWhite}></p>
        </CardHeader>
        <GridContainer>
          <GridItem sm={12} md={6}>
            <TotalCustomer allTermins={allTermins} />
          </GridItem>
          <GridItem
            sm={12}
            md={6}
            style={{
              // width: 400,
              // height: 400,
              // padding: '16px',
              position: "relative",
              // display: 'flex',

              margin: "0 auto",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TotalOders allTermins={allTermins} />
          </GridItem>
        </GridContainer>
        <MenuList role="menu">
          {allTermins?.map(termin => (
            <MenuItem key={termin._id} className={classes.dropdownItem}>
              <SnackbarContent
                message={`${termin.first_name} ${termin.last_name} đã đặt bàn mới. Vui lòng kiểm tra cụ thể!`}
                timeAgo={timeAgo(termin.created_at)}
                icon={CheckCircleOutlineIcon}
                termin={termin}
              />
            </MenuItem>
          ))}
        </MenuList>
        {/* </ClickAwayListener> */}
      </Card>
    </div>
  )
}
