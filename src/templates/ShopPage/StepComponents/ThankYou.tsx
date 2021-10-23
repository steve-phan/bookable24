import React, { useEffect, useState } from "react"
import Loading from "../../../components/Loading/Loading"
import { ThankYouSt, TypographySt } from "./StepComponents.css"
import { useAppDispatch, useAppSelector } from "../../../store/hooks"
import { Link, useTranslation } from "gatsby-plugin-react-i18next"

const ThankYou = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const {
    guestInfo: { email, lastName, firstName },
  } = useAppSelector(state => state.booking)
  const { t } = useTranslation()

  return (
    <ThankYouSt>
      {/* <Loading /> */}
      <p>{t("thankyou.thank") + lastName + " " + firstName}</p>
      <p>{t("thankyou.text") + " " + email}</p>
    </ThankYouSt>
  )
}

export default ThankYou
