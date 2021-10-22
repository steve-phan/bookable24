import * as React from "react"
import Button, { ButtonProps } from "@mui/material/Button"
import { alpha, styled, ThemeOptions } from "@mui/material/styles"

type TButton = { slotActive: boolean } & ButtonProps
export const ButtonSlotSt = styled(Button)<TButton>(({ theme, slotActive }) => {
  console.log(theme)
  return {
    background: theme?.color?.primary,

    // "&:hover": {
    //   background: "blue",
    // },
  }
})
