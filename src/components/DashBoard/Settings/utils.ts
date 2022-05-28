import dayjs from "dayjs"

export const updateList = (arr: number[], i: number) => {
  const newArr = arr.filter(num => num !== i)
  return newArr
}

export const checkClosedDay = (
  day: string | Date,
  closedSpecificDay: string[] | Date[] = []
) => {
  // console.log(closedSpecificDay)
  // console.log({ day: dayjs(day).startOf("day").diff(dayjs().startOf("day")) })
  // console.log(dayjs(day).isBefore(dayjs()))
  // console.log(dayjs(day))
  // console.log({ closedSpecificDay: dayjs(day).isSame(closedDay) })
  // console.log({ isSamgeDay: dayjs(day).isSame(dayjs("29/05/2022")) })
  // console.log({
  //   closedSpecificDay: closedSpecificDay.every(cllosedDay =>
  //     dayjs(day).isSame(dayjs(cllosedDay))
  //   ),
  // })
  console.log("format ", dayjs(day).format("DD/MM/YYYY"))
  console.log("format 1 ", dayjs(closedSpecificDay[0]).format("DD/MM/YYYY"))

  return (
    dayjs(day).isBefore(dayjs()) ||
    closedSpecificDay.every(
      (closedDay: any) =>
        dayjs(day).format("DD/MM/YYYY") ===
        dayjs(closedDay).format("DD/MM/YYYY")
    )
  )
  // closedSpecificDay.every(closedDay => dayjs(day).isSame(closedDay))
  // dayjs(day).startOf("day").diff(dayjs().startOf("day")) < 0 ||
  // closedSpecificDay.includes(day)
  // (closedDay !== "none" && dayjs(day).day() === week[closedDay])
}
