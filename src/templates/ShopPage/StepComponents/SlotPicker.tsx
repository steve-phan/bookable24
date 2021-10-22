import React, { useContext, useEffect, useState } from "react"
import { Button, ButtonGroup } from "@mui/material"
import clsx from "clsx"
import moment from "moment"
import axios from "axios"
import { makeStyles } from "@mui/styles"
import { ThemeOptions, createTheme, ThemeProvider } from "@mui/material/styles"

// import { TerminContext } from "../../context/contextTermin"
// import { terminTypes } from "../../context/contextTermin/terminTypes"
import Loading from "../../../components/Shared/Loading/Loading"

import { morningSlots, afternoonSlots } from "../utils"
import { useAppDispatch, useAppSelector } from "../../../store/hooks"
import { setSelectedSlot } from "../../../store/shop/bookingSlice"
import { ButtonSlotSt } from "./StepComponents.css"

const useStyles = makeStyles(theme => {
  console.log("theme", theme)
  return {
    wrap: {
      width: "100%",
      gap: "6px",
      flexWrap: "wrap",
    },
    basicBtn: {
      flexBasis: "calc(33.3% - 4px)",
      border: "1px solid pink !important",
      borderRadius: "4px !important",
      fontWeight: "bold",
      color: "#2b4660 ",
      // backgroundColor: "#d4f4fe",
      backgroundColor: "red",
      "&:hover": {
        // backgroundColor: 'unset !important',
      },
    },
    warning: {
      width: "60px",
      height: "26px",
      display: "inline-block",
      background: "#ffda44",
      transform: "translateY(7px)",
    },
    warningSlot: {
      background: "#ffda44",
    },

    title: {
      padding: "16px 0 10px",
      color: "red",
    },
    active: {
      backgroundColor: `blue`,
      // color: 'white',
      "&:hover": {
        backgroundColor: "#17b355",
        // color: 'white',
      },
    },
  }
})
// const theme = createTheme({
//   components: {
//     // Name of the component ⚛️
//     MuiButtonBase: {
//       defaultProps: {
//         // The default props to change
//         disableRipple: true, // No more ripple, on the whole application 💣!
//       },
//     },
//   },
// })

const Warning = () => {
  return (
    <div>
      These slots might <span></span> would be delayed a short time.
    </div>
  )
}

const isWeekend = (date: Date) =>
  moment(date).day() === 6 || moment(date).day() === 7

const SlotPicker = () => {
  const [loading, setLoading] = useState(true)
  const [terminsBooked, setTerminsBooked] = useState([])
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const { selectedSlot, selectedDate } = useAppSelector(state => state.booking)
  // const [{ selectedSlot, selectedDate }, dispatch] = useContext(TerminContext)
  // console.log(selectedDate);
  // useEffect(() => {
  //   if (isWeekend(selectedDate)) {
  //     const formatDate = moment(
  //       selectedDate,
  //       selectedDate.length === 10 ? "DD-MM-YYYY" : "YYYY MM DD"
  //     ).format("MMM DD")
  //     console.log("formatDate", formatDate)
  //     axios
  //       .post("/.netlify/functions/get-termin-weekend", {
  //         selectedDate: formatDate,
  //       })
  //       .then(data => {
  //         setTerminsBooked(reduceTermins(data.data))
  //         setLoading(false)
  //       })
  //       .catch(err => {
  //         setLoading(false)
  //       })
  //     // console.log('Selecdate', selectedDate);
  //   } else {
  //     setLoading(false)
  //   }
  // }, [])
  // console.log("selectedSlot", selectedSlot)
  // console.log("classes", classes)
  return (
    <div
      className="slotpicker"
      style={{
        background: "white",
        padding: "16px",
      }}
    >
      {/* {loading && <Loading />} */}
      <div className={classes.title}>MORNING</div>
      <ButtonGroup
        // disableElevation
        className={classes.wrap}
        color="primary"
        aria-label="outlined primary button group"
      >
        {morningSlots.map((slot, index) => {
          return (
            <ButtonSlotSt
              //   style={{ color: 'red' }}
              slotActive={selectedSlot === index}
              className={clsx(
                classes.basicBtn,
                selectedSlot === index ? classes.active : null
              )}
              // disabled={slots_booked.includes(slot)}
              key={index + slot}
              onClick={() => {
                dispatch(setSelectedSlot(index))
                // setActive(index);
                // dispatch({
                //   type: terminTypes.SET_SLOT,
                //   slot: index,
                // })
              }}
            >
              {" "}
              {slot}{" "}
            </ButtonSlotSt>
          )
        })}
      </ButtonGroup>
      <div className={classes.title}>AFTERNOON</div>
      {/* {selectedDate && isWeekend(selectedDate) ? (
        <div
          style={{
            paddingBottom: 10,
          }}
        >
          These slots{" "}
          <span className={clsx(classes.basicBtn, classes.warning)}></span>{" "}
          might would be delayed a short time.
        </div>
      ) : null} */}
      <ButtonGroup
        // disableElevation
        className={classes.wrap}
        color="primary"
        aria-label="outlined primary button group"
      >
        {afternoonSlots.map((slot, index: number) => {
          const newIndex = morningSlots?.length + index
          return (
            <Button
              //   style={{ color: 'red' }}
              className={clsx(
                selectedSlot === newIndex ? classes.active : null,
                classes.basicBtn,
                selectedDate &&
                  isWeekend(selectedDate) &&
                  [13, 14, 15, 16, 17, 18, 19].includes(newIndex)
                  ? classes.warningSlot
                  : null
              )}
              // disabled={
              //   [13, 14, 15, 16, 17, 18, 19].includes(newIndex) &&
              //   terminsBooked[String(newIndex)] >= 2
              // }
              key={newIndex + slot}
              onClick={() => {
                dispatch(setSelectedSlot(newIndex))

                // setActive(newIndex);
                // dispatch({
                //   type: terminTypes.SET_SLOT,
                //   slot: newIndex,
                // })
              }}
            >
              {" "}
              {/* {[13, 14, 15, 16, 17, 18, 19].includes(newIndex) &&
              terminsBooked[String(newIndex)] >= 2
                ? "full"
                : slot} */}
              {slot}
            </Button>
          )
        })}
      </ButtonGroup>
    </div>
  )
}

export default SlotPicker
