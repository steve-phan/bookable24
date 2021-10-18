import DateFnsUtils from "@date-io/date-fns"
import { ThemeProvider } from "@material-ui/core"
import FormControl from "@material-ui/core/FormControl"
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
import Select from "@material-ui/core/Select"
import { makeStyles, createTheme } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers"
import deLocale from "date-fns/locale/de"
import moment from "moment"
import React, { useContext, useEffect, useState } from "react"

// import { TerminContext } from "../../context/contextTermin"
// import { terminTypes } from "../../context/contextTermin/terminTypes"

const useStyles = makeStyles(theme => ({
  wrap: {
    display: "plex",
    justifyContent: "space-around",
  },

  button: {
    display: "block",
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}))

const useDateTheme = makeStyles({
  overrides: {
    MuiSelect: {
      root: {
        // paddingLeft: 16,
      },
    },
    MuiDialogActions: {
      root: {
        display: "none",
      },
    },
  },
})

// Array 15 slots

const DatePicker = () => {
  // const [{ selectedDate }, dispatch] = useContext(TerminContext)
  const [currentDate, setCurrentDate] = useState<Date | null>(new Date())

  const classes = useStyles()
  const dateTheme = useDateTheme()
  const [num, setNum] = React.useState(1)
  const [open, setOpen] = React.useState(false)

  // useEffect(() => {
  //   dispatch({
  //     type: terminTypes.SET_DATE,
  //     date: new Date(),
  //   })
  // }, [])
  const handleChange = () => {
    // setNum(event.target.value)
    // console.log(event.target.value);
    // dispatch({
    //   type: terminTypes.SET_PERSON,
    //   person: event.target.value,
    // })
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
  // const checkDisableDate = day => {
  //   return (
  //     // schedule === 0 ||
  //     moment(day).startOf("day").diff(moment().startOf("day")) < 0
  //   )
  // }
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date("2014-08-18T21:11:54")
  )

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date)
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justifyContent="space-around">
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Date picker inline"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Date picker dialog"
          format="MM/dd/yyyy"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  )
}

export default DatePicker

// export const PersonSelect = () => {
//   return (
//     <FormControl className={classes.formControl}>
//       <InputLabel id="demo-controlled-open-select-label">Personen</InputLabel>
//       <Select
//         style={{ paddingLeft: 16 }}
//         labelId="demo-controlled-open-select-label"
//         id="demo-controlled-open-select"
//         open={open}
//         onClose={handleClose}
//         onOpen={handleOpen}
//         value={num}
//         onChange={handleChange}
//         MenuProps={{
//           anchorOrigin: {
//             vertical: "bottom",
//             horizontal: "left",
//           },
//           transformOrigin: {
//             vertical: "top",
//             horizontal: "left",
//           },
//           getContentAnchorEl: null,
//         }}
//       >
//         <MenuItem value={1}>1</MenuItem>
//         <MenuItem value={2}>2</MenuItem>
//         <MenuItem value={3}>3</MenuItem>
//         <MenuItem value={4}>4</MenuItem>
//         <MenuItem value={5}>5</MenuItem>
//         <MenuItem value={6}>6</MenuItem>
//         <MenuItem value={7}>7</MenuItem>
//         <MenuItem value={8}>8</MenuItem>
//         <MenuItem value={9}>9</MenuItem>
//         <MenuItem value={10}>10</MenuItem>
//         <MenuItem value={11}>More</MenuItem>
//       </Select>
//     </FormControl>
//   )
// }
