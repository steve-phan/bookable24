import * as React from "react"
import AdapterDateFns from "@mui/lab/AdapterDateFns"
import DatePicker from "@mui/lab/DatePicker"
import LocalizationProvider from "@mui/lab/LocalizationProvider"
import TextField from "@mui/material/TextField"
import { useTranslation } from "gatsby-plugin-react-i18next"

import { useAppDispatch, useAppSelector } from "src/store/hooks"
import { setSelectedDate } from "src/store/shop/bookingSlice"

import { WrapRowSt } from "../ShopPage.css"
import { checkDisableDate } from "../utils"
import PersonPicker from "./PersonPicker"

const SelectDatePicker = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { selectedDate } = useAppSelector(state => state.booking)
  const { closedRegularDay, closedSpecificDay } = useAppSelector(
    state => state.shop.shopInfo?.settings
  )
  return (
    <WrapRowSt>
      <PersonPicker />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          shouldDisableDate={date =>
            checkDisableDate(date, closedRegularDay, closedSpecificDay)
          }
          label={t("booking.datepicker.date")}
          inputFormat="MMM-dd-yyyy"
          value={selectedDate}
          onChange={newValue => {
            newValue && dispatch(setSelectedDate(new Date(newValue)))
          }}
          renderInput={params => <TextField variant="standard" {...params} />}
        />
      </LocalizationProvider>
    </WrapRowSt>
  )
}

export default SelectDatePicker
