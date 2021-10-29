import Typography from "@mui/material/Typography"
import moment from "moment"
import React from "react"
import { useI18next } from "gatsby-plugin-react-i18next"
import axios from "axios"

import { useAppDispatch, useAppSelector } from "../../../store/hooks"
import { WrapColSt } from "../ShopPage.css"
import { afternoonSlots, morningSlots } from "../utils"
import { CardSt } from "../StepComponents/StepComponents.css"
import { CanCelButtonSt } from "../ShopPage.css"

const CancelBooking = ({ booking }: { booking: any }) => {
  const dispatch = useAppDispatch()
  const { navigate } = useI18next()
  const {
    selectedDate,
    selectedSlot,
    guestInfo,
    last_name,
    first_name,
    require,
    person,
    email,
    phone,
  } = booking
  //   useAppSelector(state => state.booking)

  return (
    <WrapColSt>
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

        <Typography>Persons: {person}</Typography>
        <Typography>Require: {require}</Typography>
      </CardSt>

      <CardSt>
        <Typography variant="h6" component="h5">
          Contact Info
        </Typography>
        <Typography>Name: {last_name + " " + first_name}</Typography>
        <Typography>Email: {email}</Typography>
        <Typography>Phone: {phone}</Typography>
      </CardSt>

      <CanCelButtonSt
        style={{
          color: "white",
        }}
        onClick={() => {
          axios
            .get("/.netlify/functions/cancel-booking")
            .then(res => {
              console.log(res.data)
            })
            .catch(err => console.log("err", err))
          alert("Cancel success. Thanks")
          navigate("/")
        }}
      >
        Cancel Booking?
      </CanCelButtonSt>
    </WrapColSt>
  )
}

export default CancelBooking
