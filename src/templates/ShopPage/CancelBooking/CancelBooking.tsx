import Typography from "@mui/material/Typography"
import dayjs from "dayjs"
import React, { useEffect, useState } from "react"
import { useI18next } from "gatsby-plugin-react-i18next"
import axios from "axios"

import { IshopInfo } from "src/store/shop/shop.types"
import Loading from "src/components/ContentComponents/Loading/Loading"
import SEO from "src/components/seo"

import { WrapColSt } from "../ShopPage.css"
import { afternoonSlots, morningSlots } from "../utils"
import { CardSt } from "../StepComponents/StepComponents.css"
import { CanCelButtonSt } from "../ShopPage.css"
import ShopLogo from "../ShopLogo/ShopLogo"

const CancelBooking = ({
  bookingId,
  shopId,
  location,
}: {
  bookingId: string
  shopId: string
  location: Location
}) => {
  const [booking, setBooking] = useState<any>({})
  const [shopInfo, setShopInfo] = useState<any>({})
  const [isLoading, setIsLoading] = useState<boolean>(true)
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
    status,
  } = booking

  useEffect(() => {
    axios
      .post(
        "/.netlify/functions/cancel-termin",
        JSON.stringify({ bookingId, shopId })
      )
      .then(res => {
        setIsLoading(false)
        // @ts-ignore
        const { appointmentFound, shopInfo } = res.data
        console.log(res.data)
        setBooking(appointmentFound)
        setShopInfo(shopInfo)
      })
      .catch(err => console.log("err", err))
  }, [])

  const handleCancelBooking = () => {
    setIsLoading(true)
    const bookingId = location.search.replace("?", "").split("=")[1]
    axios
      .get("/.netlify/functions/cancel-termin", {
        headers: {
          shopId,
          bookingId,
        },
      })
      .then(res => {
        alert("Cancel success. Thanks")
        setIsLoading(false)
        navigate("/")
      })
      .catch(err => {
        console.log("err", err)
        setIsLoading(false)
      })
  }
  if (status) {
    return <p>This reservation is not exist</p>
  }

  return (
    <WrapColSt>
      {isLoading && <Loading />}
      <SEO title={`${shopInfo?.company} || Online Booking System`} />

      <ShopLogo shopInfo={shopInfo} />

      <CardSt>
        <Typography variant="h6" component="h5">
          Details Info
        </Typography>
        <Typography>
          Time:{" "}
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
        <Typography>Name: {last_name + " " + first_name}</Typography>
        <Typography>Email: {email}</Typography>
        <Typography>Phone: {phone}</Typography>
      </CardSt>

      <CanCelButtonSt
        style={{
          color: "white",
        }}
        onClick={handleCancelBooking}
      >
        Cancel Booking?
      </CanCelButtonSt>
    </WrapColSt>
  )
}

export default CancelBooking
