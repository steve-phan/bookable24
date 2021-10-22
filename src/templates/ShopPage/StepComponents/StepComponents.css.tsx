import * as React from "react"
import Button, { ButtonProps } from "@mui/material/Button"
import { alpha, styled, ThemeOptions } from "@mui/material/styles"

type TButtonOptions = {
  slotActive: boolean
  slotWarning?: boolean
}
type TButton = ButtonProps & TButtonOptions

export const ButtonGroupSt = styled("div")(({ theme }) => ({
  display: "flex",
  width: "100%",
  gap: "6px",
  flexWrap: "wrap",
}))

export const ButtonSlotSt = styled(Button)<TButton>(
  ({ theme, slotActive, slotWarning }) => ({
    flexBasis: "calc(33.3% - 4px)",
    border: `1px solid ${alpha(theme.color.primary, 0.3)} !important`,
    borderRadius: "4px !important",
    fontWeight: "bold",

    color: slotActive ? "white" : theme.color.text,
    background: slotActive
      ? theme?.color?.primary
      : slotWarning
      ? theme.color.warning
      : "inherit",

    "&:hover": {
      background: slotActive ? alpha(theme?.color?.primary, 0.8) : "inherit",
    },
  })
)

export const TitleBannerSt = styled("div")(({ theme }) => ({
  margin: "8px auto",
  padding: 10,
  textAlign: "center",
  background: theme.color.background,

  "& h5": {
    fontSize: 20,
    marginBottom: 0,
    padding: 10,
  },
  "& span": {
    display: "block",
    fontSize: 14,
    height: "40px",
  },
  "& strong": {
    display: "inline-block",
    borderRadius: 4,
    width: 80,
    height: 26,
    background: theme.color.warning,
    transform: "translateY(7px)",
  },
}))
