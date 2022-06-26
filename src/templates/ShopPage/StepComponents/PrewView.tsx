import Typography from "@mui/material/Typography"
import dayjs from "dayjs"
import React, { useEffect } from "react"

import { useAppDispatch, useAppSelector } from "src/store/hooks"
import { setCustomerValidInfo } from "src/store/shop/bookingSlice"
import { WrapColSt } from "../ShopPage.css"
import { afternoonSlots, getDefaultSlot, morningSlots } from "../utils"
import { CardSt } from "./StepComponents.css"

const PrewView = () => {
  const {
    selectedDate,
    selectedSlot = getDefaultSlot(),
    firstName,
    lastName,
    email,
    phone,
    person,
    require,
    isValidInfo,
  } = useAppSelector(state => state.booking)
  const dispatch = useAppDispatch()

  useEffect(() => {
    return () => {
      dispatch(setCustomerValidInfo(false))
    }
  }, [])

  return (
    <WrapColSt>
      <CardSt>
        <Typography variant="h6" component="h5">
          Details Info
        </Typography>
        <Typography>
          Time:
          {[...morningSlots, ...afternoonSlots][selectedSlot] +
            " " +
            dayjs(selectedDate).format("dddd, DD. MMMM")}
        </Typography>

        <Typography>Persons: {person}</Typography>
        <Typography>Require: {require}</Typography>
      </CardSt>

      <CardSt>
        <Typography variant="h6" component="h5">
          Contact Info
        </Typography>

        <Typography>Name: {lastName + " " + firstName}</Typography>
        <Typography>Email: {email}</Typography>
        <Typography>Phone: {phone}</Typography>
      </CardSt>
    </WrapColSt>
  )
}

export default PrewView
