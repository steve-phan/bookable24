import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
import isToday from "dayjs/plugin/isToday"
import isTomorrow from "dayjs/plugin/isTomorrow"
import isYesterday from "dayjs/plugin/isYesterday"

import { morningSlots, afternoonSlots } from "src/templates/ShopPage/utils"
import { IShop, ITermin } from "./store/shop/shop.types"
// dependent on utc plug
/**
 * @TODO : Working with timezone
 */
dayjs.extend(isToday)
dayjs.extend(isTomorrow)
dayjs.extend(isYesterday)
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault("Europe/Berlin")

export const dayjsModified = dayjs

export const allSlots = [...morningSlots, ...afternoonSlots]
export const validateEmail = (email: string) => {
  const regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return regex.test(email)
}
export const validatePhone = (phoneNumber: string) => {
  const regex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/
  return regex.test(phoneNumber)
}

export const getRandomColor = () => {
  var letters = "0123456789ABCDEF"
  var color = "#"
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

export const getShopName = (emailVerify: string, shopList: IShop[]) => {
  return shopList?.find(
    ({ email }: IShop) => email.toLowerCase() === emailVerify.toLowerCase()
  )?.shopId
}

export interface ItimeAgoMess {
  second: string
  minute: string
  halfhour: string
  hour: string
  hours: string
  day: string
  week: string
  month: string
}

export const timeAgo = (
  dateParam: Date | string,
  t: ItimeAgoMess,
  currenDay = new Date()
) => {
  const date =
    typeof dateParam === "object"
      ? dateParam.getTime()
      : new Date(dateParam).getTime()

  const today: number = currenDay.getTime()
  const seconds = Math.round((today - date) / 1000)
  const minutes = Math.round(seconds / 60)
  console.log({ minutes })
  switch (true) {
    case seconds < 60:
      return `${seconds}  ${t.second}`
    case seconds < 90:
      return t.minute
    case minutes < 30:
      return t.halfhour
    case minutes < 60:
      return t.hour
    case minutes / 60 < 24:
      return `${Math.round(minutes / 60)} ${t.hours}`
    case minutes / 60 / 24 < 7:
      return `${Math.round(minutes / 60 / 24)} ${t.day}`
    case minutes / 60 / 24 / 7 < 1:
      return `${Math.round(minutes / 60 / 24 / 7)} ${t.week}`
    default:
      return t.month
  }
}

export const filterBookings = (allTermins: ITermin[], today: string) =>
  allTermins
    .filter(
      (termin: ITermin) => dayjs(termin.selectedDate).format("MMM DD") === today
    )
    .sort(
      (a: ITermin, b: ITermin) =>
        Number(a.selectedSlot) - Number(b.selectedSlot)
    )

export const getTodayBookings = (allTermins: ITermin[]) =>
  allTermins.filter(termin => dayjs(termin?.selectedDate).isToday())

export const getTomorrowBookings = (allTermins: ITermin[]) =>
  allTermins.filter(termin => dayjs(termin?.selectedDate).isTomorrow())
/**
 *
 * @param allTermins : allTermins pass in
 * @param date : the termins of this date
 * @returns : the termins
 */

export const getDateBookings = (allTermins: ITermin[], date: Date | null) => {
  let pickedDay = date && new Date(date)
  const day = dayjs(pickedDay).format("MMM DD")
  return filterBookings(allTermins, day)
}
