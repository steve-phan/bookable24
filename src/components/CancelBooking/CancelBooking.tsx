import Typography from "@mui/material/Typography"
import dayjs from "dayjs"
import React, { useEffect, useState } from "react"
import { useI18next } from "gatsby-plugin-react-i18next"

import { ITermin } from "src/store/shop/shop.types"
import Loading from "src/components/ContentComponents/Loading/Loading"
import SEO from "src/components/seo"
import { useAppDispatch, useAppSelector } from "src/store/hooks"
import { getCancelTermin, confirmCancelTermin } from "src/store/shop/shopSlice"

import { WrapColSt } from "../../templates/ShopPage/ShopPage.css"
import { afternoonSlots, morningSlots } from "../../templates/ShopPage/utils"
import { CardSt } from "../../templates/ShopPage/StepComponents/StepComponents.css"
import { CanCelButtonSt } from "../../templates/ShopPage/ShopPage.css"
import ShopLogo from "../../templates/ShopPage/ShopLogo/ShopLogo"

const CancelBooking = ({
  bookingId,
  shopId,
  location,
}: {
  bookingId: string
  shopId: string
  location: Location
}) => {
  const [isLoading, setIsLoading] = useState(true)
  const { navigate } = useI18next()

  const dispatch = useAppDispatch()
  const {
    shopInfo,
    cancelTermin: booking,
    isFetching,
  } = useAppSelector(state => state.shop)

  const {
    selectedDate,
    selectedSlot,
    lastName,
    firstName,
    require,
    person,
    email,
    phone,
    status,
    canceled,
  } = booking as ITermin

  useEffect(() => {
    if (!shopId || !bookingId) {
      navigate("/")
    }
  }, [])

  useEffect(() => {
    setIsLoading(isFetching)
  }, [isFetching])

  useEffect(() => {
    dispatch(getCancelTermin({ bookingId, shopId }))
  }, [])

  const handleCancelBooking = () => {
    dispatch(confirmCancelTermin({ bookingId, shopId }))
  }
  if (status) {
    return <WrapColSt>This reservation is not exist </WrapColSt>
  }
  if (canceled) {
    return <WrapColSt>Your booking was canceled. Thank you :) </WrapColSt>
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <WrapColSt>
      <SEO title={`${shopInfo?.company} || Online Booking System`} />

      <ShopLogo shopInfoMongoDB={shopInfo} />

      <CardSt>
        <Typography variant="h6" component="h5">
          Details Info
        </Typography>
        <Typography>
          Time:{" "}
          {[...morningSlots, ...afternoonSlots][Number(selectedSlot)] +
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
