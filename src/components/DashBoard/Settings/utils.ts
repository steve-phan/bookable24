// import dayjs from "dayjs"

import { dayjsModified } from "src/utils"

export const updateList = (arr: number[], i: number) => {
  const newArr = arr.filter(num => num !== i)
  return newArr
}

export const checkClosedDay = (
  day: string | Date,
  closedSpecificDay: Date[] = []
) => {
  const foundDayClosed = closedSpecificDay.findIndex(closedDay => {
    return dayjsModified(day).isSame(dayjsModified(closedDay), "day")
  })
  return (
    dayjsModified(day).isBefore(dayjsModified(), "hour") || foundDayClosed >= 0
  )
}
