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
