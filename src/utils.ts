import { createTheme } from "@mui/material/styles"

export const validateEmail = (email: string) => {
  const regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return regex.test(email)
}
export const validatePhone = (phoneNumber: string) => {
  const regex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/
  return regex.test(phoneNumber)
}

export const theme = createTheme({
  color: {
    primary: "#f05123",
    secondary: "#1473e6",
    warning: "#d1cec3",
    white: "#ffffff",
    gray: "#666",
    text: "#202124",
    invalid: "#f33a58",
    background: "#f3f3f3ee",
    black: "#000000",
    activeBackground: "#fff1f9",
    activeColor: "deeppink",
    iconColor: "#e84b63",
  },
})

export const getShopName = (email: string | null, shopList: any[]) =>
  shopList?.find(
    (shop: { email: string; shopId: string }) => shop.email === email
  )?.shopId

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

export const timeAgo = (dateParam: Date, t: ItimeAgoMess) => {
  if (!dateParam) {
    return null
  }

  const date =
    typeof dateParam === "object"
      ? dateParam.getTime()
      : new Date(dateParam).getTime()

  const DAY_IN_MS = 86400000
  const today: number = new Date().getTime()
  const yesterday = new Date(today - DAY_IN_MS)
  const seconds = Math.round((today - date) / 1000)
  const minutes = Math.round(seconds / 60)
  // const isToday = today.toDateString() === date.toDateString()
  // const isYesterday = yesterday.toDateString() === date.toDateString()
  // const isThisYear = today.getFullYear() === date.getFullYear()

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
      return ` ${Math.round(minutes / 60 / 24)} ${t.day}`
    case minutes / 60 / 24 / 7 < 1:
      return `${Math.round(minutes / 60 / 24 / 7)} ${t.week}`
    default:
      return t.month
  }
}
