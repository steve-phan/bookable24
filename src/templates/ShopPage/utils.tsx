import React, { ReactElement } from "react"
import DatePicker from "./StepComponents/DatePicker"
import SlotPicker from "./StepComponents/SlotPicker"
import InfoUser from "./StepComponents/InfoUser"
import moment from "moment"
import PrewView from "./StepComponents/PrewView"
import ThankYou from "./StepComponents/ThankYou"

export const checkDisableDate = (day: Date) => {
  return (
    // schedule === 0 ||
    moment(day).startOf("day").diff(moment().startOf("day")) < 0
  )
}

export const getStepContent = (step: number): ReactElement => {
  switch (step) {
    case 0:
      return <DatePicker />
    case 1:
      return <SlotPicker />
    case 2:
      return <InfoUser />
    case 3:
      return <PrewView />
    case 4:
      return <ThankYou />
    default:
      return <h1>User Info </h1>
  }
}

export const morningSlots = [
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
]
export const afternoonSlots = [
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
]
