import { useTranslation } from "gatsby-plugin-react-i18next"
import moment from "moment"
import * as React from "react"
import { useAppDispatch, useAppSelector } from "src/store/hooks"
import { getTomorrowBookings } from "src/utils"

import ShowInfo from "../SharedComponent/ShowInfo"

const TomorrowBookings = () => {
  const { shopInfo, allTermins } = useAppSelector(state => state.shop)
  return <ShowInfo todayTermins={getTomorrowBookings(allTermins)} />
}

export default TomorrowBookings
