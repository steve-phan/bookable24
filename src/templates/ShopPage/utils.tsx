import React, { ReactElement } from "react"
import DatePicker from "./StepComponents/DatePicker"
import SlotPicker from "./StepComponents/SlotPicker"
import InfoUser from "./StepComponents/InfoUser"
import PrewView from "./StepComponents/PrewView"
import ThankYou from "./StepComponents/ThankYou"
import dayjs from "dayjs"
import { dayjsModified } from "src/utils"

const week = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
  none: "none",
}

type TWeek = "none" | "Sun" | "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat"

export const getClosedDay = (day: TWeek) => dayjs().day() === week[day]

export const checkDisableDate = (
  day: Date,
  closedDay: TWeek,
  closedSpecificDay: Date[]
) => {
  const foundDayClosed = closedSpecificDay.findIndex(specificDay => {
    return (
      specificDay &&
      dayjsModified(day).isSame(dayjsModified(specificDay), "day")
    )
  })
  return (
    dayjs(day).startOf("day").diff(dayjs().startOf("day")) < 0 ||
    (closedDay !== "none" && dayjs(day).day() === week[closedDay]) ||
    foundDayClosed >= 0
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
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
]
export const afternoonSlots = [
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

export const allSlots = [...morningSlots, ...afternoonSlots]

export const getDefaultSlot = () => {
  const hour = dayjs().hour()
  const index = allSlots.findIndex((slot, i) => {
    return Number(slot.split(":")[0]) === hour + 3
  })

  return index === -1 ? 0 : index
}

export const isSameDay = (day: Date) => dayjs().isSame(dayjs(day), "hour")
export const currentHour = dayjs().hour()
