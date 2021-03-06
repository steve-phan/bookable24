import React, { useEffect } from "react"
import { useTranslation } from "gatsby-plugin-react-i18next"

import { setDefaultStateBooking } from "src/store/shop/bookingSlice"
import { useAppDispatch, useAppSelector } from "src/store/hooks"

import { ThankYouSt } from "./StepComponents.styles"

const ThankYou = () => {
  const { email, lastName, firstName } = useAppSelector(state => state.booking)
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  useEffect(() => {
    return () => {
      dispatch(setDefaultStateBooking())
    }
  }, [])
  return (
    <ThankYouSt>
      <p>{t("thankyou.thank") + lastName + " " + firstName}</p>
      <p>{t("thankyou.text") + " " + email}</p>
    </ThankYouSt>
  )
}

export default ThankYou
