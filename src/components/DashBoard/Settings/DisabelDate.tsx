import DatePicker from "@mui/lab/DatePicker"
import LocalizationProvider from "@mui/lab/LocalizationProvider"
import AdapterDateFns from "@mui/lab/AdapterDateFns"
import { TextField } from "@mui/material"
import React, { useState } from "react"

const DisabelDate = () => {
  const [disableDay, setDisableDay] = useState(new Date())
  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          //   shouldDisableDate={date => checkDisableDate(date, closedDay)}
          label="Datum"
          inputFormat="MMM-dd-yyyy"
          value={disableDay}
          onChange={newValue => {
            console.log(newValue)
            //   dispatch(setSelectedDate(newValue))
          }}
          renderInput={params => <TextField variant="standard" {...params} />}
        />
      </LocalizationProvider>
    </div>
  )
}

export default DisabelDate
