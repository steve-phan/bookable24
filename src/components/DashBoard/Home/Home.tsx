import React from "react"
import {
  MenuList,
  MenuItem,
  Grid,
  Typography,
  IconButton,
  Modal,
} from "@mui/material"
import Snack from "@mui/material/SnackbarContent"
import { useTranslation } from "gatsby-plugin-react-i18next"
import CheckCircleOutlineOutlined from "@mui/icons-material/CheckCircleOutlineOutlined"
import Close from "@mui/icons-material/Close"

import { timeAgo, ItimeAgoMess } from "src/utils"
import moment from "moment"

import { useAppDispatch, useAppSelector } from "src/store/hooks"
import { getShopinfo } from "src/store/shop/shopSlice"
import { morningSlots, afternoonSlots } from "src/templates/ShopPage/utils"

import TotalCustomer from "./Chart/TotalCustomer"
import TotalOders from "./Chart/TotalOder"
import {
  GridItem,
  MenuItemSt,
  TimeAgoSpanSt,
  MessageSpanSt,
  WrapMessageSt,
  InfoSt,
} from "./Home.css"

const HomeDashBoard = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { shopInfo, allTermins } = useAppSelector(state => state.shop)

  const newestTermins = allTermins.slice(allTermins.length - 10)

  const showMess: ItimeAgoMess = {
    second: t("dashboard.dashboard.timeago.second"),
    minute: t("dashboard.dashboard.timeago.minute"),
    halfhour: t("dashboard.dashboard.timeago.halfhour"),
    hour: t("dashboard.dashboard.timeago.hour"),
    hours: t("dashboard.dashboard.timeago.hours"),
    day: t("dashboard.dashboard.timeago.day"),
    week: t("dashboard.dashboard.timeago.week"),
    month: t("dashboard.dashboard.timeago.month"),
  }

  return (
    <div>
      <Grid container>
        <Grid item flexGrow={1} sm={12} md={4}>
          <TotalCustomer allTermins={allTermins} />
        </Grid>
        <Grid item flexGrow={1} sm={12} md={8}>
          <TotalOders allTermins={allTermins} />
        </Grid>
      </Grid>
      <MenuList>
        {newestTermins?.reverse().map(termin => (
          <MenuItemSt key={termin._id}>
            <SnackbarContent
              message={
                termin.first_name +
                " " +
                termin.last_name +
                " " +
                t("dashboard.dashboard.hasbooked")
              }
              timeAgo={timeAgo(termin.created_at, showMess)}
              icon={CheckCircleOutlineOutlined}
              termin={termin}
            />
          </MenuItemSt>
        ))}
      </MenuList>
    </div>
  )
}

export default HomeDashBoard

export const SnackbarContent = (props: any) => {
  const { t } = useTranslation()
  const {
    message,
    color,
    close,
    icon,
    rtlActive,
    timeAgo,
    termin: {
      email,
      first_name,
      last_name,
      person,
      phone,
      require,
      selectedDate,
      selectedSlot,
    },
  } = props
  const timeSlots = [...morningSlots, ...afternoonSlots]
  var action: any[] = []
  // const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  if (close !== undefined) {
    action = [
      <IconButton key="close" aria-label="Close" color="inherit">
        <Close />
      </IconButton>,
    ]
  }
  return (
    <>
      <Snack
        onClick={handleOpen}
        message={
          <div>
            {icon !== undefined ? <props.icon /> : null}
            <MessageSpanSt>{message}</MessageSpanSt>
            <TimeAgoSpanSt>{timeAgo}</TimeAgoSpanSt>
          </div>
        }
        action={action}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <WrapMessageSt>
          <InfoSt>{t("dashboard.dashboard.details.title")} </InfoSt>
          <Typography>
            {t("dashboard.dashboard.details.name")} :
            <span>
              {first_name} {last_name}
            </span>
          </Typography>
          <Typography>
            {t("dashboard.dashboard.details.phone")} : <span>{phone} </span>
          </Typography>
          <Typography>
            {" "}
            {t("dashboard.dashboard.details.time")} :{" "}
            <span>
              {timeSlots[selectedSlot]} {selectedDate}
            </span>
          </Typography>
          <Typography>
            {" "}
            {t("dashboard.dashboard.details.number")} : <span>{person}</span>
          </Typography>
          <Typography>
            {" "}
            {t("dashboard.dashboard.details.require")} : <span>{require}</span>
          </Typography>
        </WrapMessageSt>
      </Modal>
    </>
  )
}
