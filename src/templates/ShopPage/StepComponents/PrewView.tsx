import Typography from "@mui/material/Typography"
import moment from "moment"
import React from "react"
import { useAppDispatch, useAppSelector } from "../../../store/hooks"
import { WrapColSt } from "../ShopPage.css"
import { afternoonSlots, morningSlots } from "../utils"
import { CardSt } from "./StepComponents.css"

const PrewView = () => {
  const dispatch = useAppDispatch()
  const { selectedDate, selectedSlot, guestInfo, numberOfGuest } =
    useAppSelector(state => state.booking)

  return (
    <WrapColSt>
      <CardSt style={{ border: "none", boxShadow: "none" }}>
        <Typography>{/* {shopinfo.company} */}</Typography>
        <Typography>
          {/* {shopinfo.street + " " + shopinfo.city + " " + shopinfo.cityCode} */}
        </Typography>
      </CardSt>
      <CardSt>
        <Typography variant="h6" component="h5">
          Details Info
        </Typography>
        <Typography>
          Time:{" "}
          {[...morningSlots, ...afternoonSlots][selectedSlot] +
            " " +
            moment(selectedDate).format("dddd, DD. MMMM")}
        </Typography>

        <Typography>Persons: {numberOfGuest}</Typography>
        <Typography>Require: {guestInfo.require}</Typography>
      </CardSt>

      <CardSt>
        <Typography variant="h6" component="h5">
          Contact Info
        </Typography>

        <Typography>
          Name: {guestInfo.lastName + " " + guestInfo.firstName}
        </Typography>
        <Typography>Email: {guestInfo.email}</Typography>
        <Typography>Phone: {guestInfo.phone}</Typography>
      </CardSt>
    </WrapColSt>
  )
}

export default PrewView
