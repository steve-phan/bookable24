import DatePicker from "@mui/lab/DatePicker"
import LocalizationProvider from "@mui/lab/LocalizationProvider"
import AdapterDateFns from "@mui/lab/AdapterDateFns"
import { TextField } from "@mui/material"
import React, { useState } from "react"

import { useAppDispatch, useAppSelector } from "src/store/hooks"
import { setSetingsClosedSpecificDay } from "src/store/shop/shopSlice"

import { checkClosedDay } from "./utils"
import dayjs from "dayjs"

interface IDisableDate {
  disableDay: Date | string
  setDisableDay: React.Dispatch<React.SetStateAction<Date | string>>
}

const DisabelDate = ({ disableDay, setDisableDay }: IDisableDate) => {
  //   const [disableDay, setDisableDay] = useState(new Date())
  const dispatch = useAppDispatch()

  const { closedSpecificDay } = useAppSelector(
    store => store.shop.shopInfo.settings
  )
  console.log({ closedSpecificDay })
  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          shouldDisableDate={date => checkClosedDay(date, closedSpecificDay)}
          label="Datum"
          inputFormat="MMM-dd-yyyy"
          value={disableDay}
          onChange={newValue => {
            console.log(newValue)
            setDisableDay(newValue)
            // dispatch(setSetingsClosedSpecificDay(disableDay))
          }}
          renderInput={params => <TextField variant="standard" {...params} />}
        />
      </LocalizationProvider>
    </div>
  )
}

export default DisabelDate
