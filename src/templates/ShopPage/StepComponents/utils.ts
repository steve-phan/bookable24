import moment from "moment"

export const checkDisableDate = (day: Date) => {
  return (
    // schedule === 0 ||
    moment(day).startOf("day").diff(moment().startOf("day")) < 0
  )
}
