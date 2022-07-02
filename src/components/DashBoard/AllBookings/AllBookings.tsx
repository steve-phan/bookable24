import * as React from "react"
import { useTranslation } from "gatsby-plugin-react-i18next"
import TextField from "@mui/material/TextField"
import AdapterDateFns from "@mui/lab/AdapterDateFns"
import LocalizationProvider from "@mui/lab/LocalizationProvider"
import DatePicker from "@mui/lab/DatePicker"

import { useAppSelector } from "src/store/hooks"
import { getDateBookings } from "src/utils"
import { RootState } from "src/store/store"

import ShowInfo from "../SharedComponent/ShowInfo"
import { FlexRowSt } from "./AllBookings.css"

const AllBookingsDashBoard = () => {
  const { shopInfo, allTermins } = useAppSelector(
    (state: RootState) => state.shop
  )
  const [value, setValue] = React.useState<Date | null>(new Date())
  const [showAllTermins, setShowAllTermins] = React.useState(true)
  const { t } = useTranslation()

  return (
    <>
      <FlexRowSt>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label={t("dashboard.helper.pickdate", "Pick a Date")}
            value={value}
            onChange={newValue => {
              if (showAllTermins) setShowAllTermins(false)
              setValue(newValue)
            }}
            renderInput={params => <TextField {...params} />}
          />
        </LocalizationProvider>
      </FlexRowSt>
      <ShowInfo
        todayTermins={
          showAllTermins
            ? [...allTermins]
            : [...getDateBookings(allTermins, value)]
        }
      />
    </>
  )
}
export default AllBookingsDashBoard
