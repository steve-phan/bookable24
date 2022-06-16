import * as React from "react"
import { useAppSelector } from "src/store/hooks"
import ShowInfo from "../SharedComponent/ShowInfo"

import { getTodayBookings } from "src/utils"

const ModifiedBooking = () => {
  const { allTermins } = useAppSelector(state => state.shop)
  return <ShowInfo todayTermins={getTodayBookings(allTermins)} />
}

export default ModifiedBooking
