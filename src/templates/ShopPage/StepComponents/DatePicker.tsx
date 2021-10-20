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

import { useAppDispatch, useAppSelector } from "../../../store/hooks"
import { setNumberOfGuest } from "../../../store/shop/bookingSlice"
import { WrapRowSt } from "../ShopPage.css"
// Array 15 slots

const SelectDatePicker = () => {
  // const [{ selectedDate }, dispatch] = useContext(TerminContext)
  const [currentDate, setCurrentDate] = useState<Date | null>(new Date())
  const dispatch = useAppDispatch()
  const { numberOfGuest } = useAppSelector(state => state.booking)

  // const [num, setNum] = React.useState<string | undefined>(1)
  const [open, setOpen] = React.useState(false)

  // useEffect(() => {
  //   dispatch({
  //     type: terminTypes.SET_DATE,
  //     date: new Date(),
  //   })
  // }, [])
  const handleChange = (event: SelectChangeEvent) => {
    // setNum(event.target.value as string)
    console.log(
      "bookingNumberOfGuest",
      setNumberOfGuest(Number(event.target.value as string))
    )

    dispatch(setNumberOfGuest(Number(event.target.value as string)))
    // console.log(event.target.value);
    // dispatch({
    //   type: terminTypes.SET_PERSON,
    //   person: event.target.value,
    // })
  }
  console.log("number of guest selected", numberOfGuest)
  const PersonSelect = ({ numberOfGuest }: { numberOfGuest: number }) => {
    return (
      <Box>
        <FormControl variant="standard" sx={{ minWidth: 120 }} fullWidth>
          <InputLabel id="demo-controlled-open-select-label">
            Personen
          </InputLabel>
          <Select
            style={{ paddingLeft: 16 }}
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            value={`${numberOfGuest}`}
            label="Personen"
            onChange={handleChange}
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
    <WrapRowSt>
      <PersonSelect numberOfGuest={numberOfGuest} />
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
          renderInput={params => <TextField variant="standard" {...params} />}
        />
      </LocalizationProvider>
    </WrapRowSt>
  )
}

export default SelectDatePicker
