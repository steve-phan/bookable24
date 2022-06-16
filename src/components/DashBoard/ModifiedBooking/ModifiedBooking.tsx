import Typography from "@mui/material/Typography"
import dayjs from "dayjs"
import React from "react"

import { useAppSelector } from "src/store/hooks"
import { WrapColSt, CardSt } from "./ModifiedBooking.styles"
import {
  morningSlots,
  afternoonSlots,
  getDefaultSlot,
} from "src/templates/ShopPage/utils"

const ModifiedBooking = () => {
  const {
    selectedDate,
    selectedSlot = getDefaultSlot(),
    firstName,
    lastName,
    email,
    phone,
    person,
    require,
  } = useAppSelector(state => state.booking)

  return (
    <WrapColSt>
      <CardSt>
        <Typography variant="h6" component="h5">
          Contact Info
        </Typography>

        <Typography>Name: {lastName + " " + firstName}</Typography>
        <Typography>Email: {email}</Typography>
        <Typography>Phone: {phone}</Typography>
      </CardSt>
      <CardSt>
        <Typography variant="h6" component="h5">
          Details Info
        </Typography>
        <Typography>
          Time:
          {[...morningSlots, ...afternoonSlots][selectedSlot]}
        </Typography>
        <Typography>
          Time:
          {dayjs(selectedDate).format("dddd, DD. MMMM")}
        </Typography>

        <Typography>Persons: {person}</Typography>
        <Typography>Require: {require}</Typography>
      </CardSt>
    </WrapColSt>
  )
}

export default ModifiedBooking
