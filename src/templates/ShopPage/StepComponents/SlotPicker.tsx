import React, { useContext, useEffect, useState } from "react"
import { Button, ButtonGroup } from "@mui/material"
import clsx from "clsx"
import moment from "moment"
import axios from "axios"
import { makeStyles } from "@mui/styles"

// import { TerminContext } from "../../context/contextTermin"
// import { terminTypes } from "../../context/contextTermin/terminTypes"
import Loading from "../../../components/Shared/Loading/Loading"
import { morningSlots, afternoonSlots } from "../utils"

const morningLength = morningSlots.length

const useStyles = makeStyles(theme => ({
  wrap: {
    width: "100%",
    gap: "6px",
    flexWrap: "wrap",
  },
  basicBtn: {
    flexBasis: "calc(33.3% - 4px)",
    border: "1px solid transparent !important",
    borderRadius: "4px !important",
    fontWeight: "bold",
    color: "#2b4660 ",
    backgroundColor: "#d4f4fe",
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
  },
  active: {
    backgroundColor: "#17b355",
    // color: 'white',
    "&:hover": {
      backgroundColor: "#17b355",
      // color: 'white',
    },
  },
}))

const Warning = () => {
  return (
    <div>
      These slots might <span></span> would be delayed a short time.
    </div>
  )
}
// const reduceTermins = (arr = []) =>
//   arr.reduce((acc, cur) => {
//     if (acc.hasOwnProperty(cur.selectedSlot)) {
//       return {
//         ...acc,
//         [cur.selectedSlot]: acc[cur.selectedSlot] + 1,
//       }
//     } else {
//       return {
//         ...acc,
//         [cur.selectedSlot]: 1,
//       }
//     }
//   }, {})

const isWeekend = (str: string) =>
  moment(str).day() === 6 || moment(str).day() === 7
const SlotPicker = () => {
  const [loading, setLoading] = useState(true)
  const [terminsBooked, setTerminsBooked] = useState([])
  const classes = useStyles()
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
            <Button
              //   style={{ color: 'red' }}
              // className={clsx(
              //   classes.basicBtn,
              //   selectedSlot === index ? classes.active : null
              // )}
              // disabled={slots_booked.includes(slot)}
              key={index}
              onClick={() => {
                // setActive(index);
                // dispatch({
                //   type: terminTypes.SET_SLOT,
                //   slot: index,
                // })
              }}
            >
              {" "}
              {slot}{" "}
            </Button>
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
        {afternoonSlots.map((slot, index) => {
          const newIndex = index + morningLength
          return (
            <Button
              //   style={{ color: 'red' }}
              // className={clsx(
              //   selectedSlot === newIndex ? classes.active : null,
              //   classes.basicBtn,
              //   selectedDate &&
              //     isWeekend(selectedDate) &&
              //     [13, 14, 15, 16, 17, 18, 19].includes(newIndex)
              //     ? classes.warningSlot
              //     : null
              // )}
              // disabled={
              //   [13, 14, 15, 16, 17, 18, 19].includes(newIndex) &&
              //   terminsBooked[String(newIndex)] >= 2
              // }
              key={newIndex}
              onClick={() => {
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
