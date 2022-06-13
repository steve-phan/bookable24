import * as React from "react"
import { useAppSelector } from "src/store/hooks"
import { getTomorrowBookings } from "src/utils"

import ShowInfo from "../SharedComponent/ShowInfo"

const TomorrowBookings = () => {
  const { allTermins } = useAppSelector(state => state.shop)
  return <ShowInfo todayTermins={getTomorrowBookings(allTermins)} />
}

export default TomorrowBookings
