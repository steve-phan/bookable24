import DateFnsUtils from "@date-io/date-fns"
import { ThemeProvider } from "@mui/material"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import { makeStyles } from "@mui/styles"
import Grid from "@mui/material/Grid"
import DatePicker from "@mui/lab/DatePicker"
import Box from "@mui/material/Box"

import AdapterDateFns from "@mui/lab/AdapterDateFns"
import LocalizationProvider from "@mui/lab/LocalizationProvider"
import deLocale from "date-fns/locale/de"
import moment from "moment"
import React, { useContext, useEffect, useState } from "react"
import TextField from "@mui/material/TextField"
import { alpha, styled } from "@mui/material/styles"
// import { TerminContext } from "../../context/contextTermin"
// import { terminTypes } from "../../context/contextTermin/terminTypes"

// Array 15 slots

const SelectDatePicker = () => {
  // const [{ selectedDate }, dispatch] = useContext(TerminContext)
  const [currentDate, setCurrentDate] = useState<Date | null>(new Date())

  const [num, setNum] = React.useState("")
  const [open, setOpen] = React.useState(false)

  // useEffect(() => {
  //   dispatch({
  //     type: terminTypes.SET_DATE,
  //     date: new Date(),
  //   })
  // }, [])
  const handleChange = (event: SelectChangeEvent) => {
    setNum(event.target.value as string)
    // console.log(event.target.value);
    // dispatch({
    //   type: terminTypes.SET_PERSON,
    //   person: event.target.value,
    // })
  }
  const PersonSelect = () => {
    return (
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-controlled-open-select-label">
            Personen
          </InputLabel>
          <Select
            style={{ paddingLeft: 16 }}
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            value={num}
            label="Personen"
            onChange={handleChange}
            // MenuProps={{
            //   anchorOrigin: {
            //     vertical: "bottom",
            //     horizontal: "left",
            //   },
            //   transformOrigin: {
            //     vertical: "top",
            //     horizontal: "left",
            //   },
            // }}
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={7}>7</MenuItem>
            <MenuItem value={8}>8</MenuItem>
            <MenuItem value={9}>9</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={11}>More</MenuItem>
          </Select>
        </FormControl>
      </Box>
    )
  }
  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }
  // const handleDateChange = () => {
  //   setCurrentDate(date)
  //   dispatch({
  //     type: terminTypes.SET_DATE,
  //     date,
  //   })
  // }
  // const schedule = moment(day).weekday();
  /*
   * format('YYYY-DD-MM');
   * const dateString = moment(day).format('YYYY-DD-MM');
   * this.state.schedule[dateString] === true ||
   */
  /**
   * @use to disable holiday or closed shop
   */
  const checkDisableDate = (day: any) => {
    return (
      // schedule === 0 ||
      moment(day).startOf("day").diff(moment().startOf("day")) < 0
    )
  }
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date()
  )

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date)
  }

  return (
    <Grid container justifyContent="space-around">
      <PersonSelect />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          shouldDisableDate={checkDisableDate}
          label="Datum"
          inputFormat="MMM-dd-yyyy"
          value={selectedDate}
          onChange={newValue => {
            console.log(newValue)
            setSelectedDate(newValue)
          }}
          renderInput={params => <TextField {...params} />}
        />
      </LocalizationProvider>
    </Grid>
  )
}

export default SelectDatePicker
