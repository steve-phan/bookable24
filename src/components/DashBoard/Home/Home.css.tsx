import React, { ReactNode } from "react"
import { styled, alpha } from "@mui/material/styles"
import { Grid, MenuItem } from "@mui/material"

export const GridItem = ({
  children,
  md,
}: {
  children: JSX.Element
  md: number
}) => {
  return (
    <Grid
      style={{
        width: "100%",
      }}
      item
      sm={12}
    >
      {children}
    </Grid>
  )
}

export const MenuItemSt = styled(MenuItem)(({ theme }) => ({
  fontSize: 13,
  padding: "10px 0",
  margin: "0 5px",
  borderRadius: "2px",
  WebkitTransition: "all 150ms linear",
  MozTransition: "all 150ms linear",
  OTransition: "all 150ms linear",
  MsTransition: "all 150ms linear",
  transition: "all 150ms linear",
  display: "block",
  clear: "both",
  fontWeight: 400,
  lineHeight: "1.42857143",
  whiteSpace: "normal",
  height: "unset",
  minHeight: "unset",

  "& div": {
    color: theme.color.text,
    backgroundColor: theme.color.background,
    // backgroundColor: '#cecece',

    "& svg": {
      color: theme.color.activeColor,
      position: "absolute",
      transform: "translateY(-50%)",
      top: "50%",
    },
  },

  "&:hover": {
    backgroundColor: "#f1f1f1",

    // color: whiteColor,
    // ...primaryBoxShadow,
  },
}))

export const MessageSpanSt = styled("span")(({ theme }) => ({
  display: "block",
  paddingLeft: 40,
}))

export const TimeAgoSpanSt = styled("span")(({ theme }) => ({
  fontSize: 13,
  color: theme.color.secondary,
  paddingLeft: 40,
}))

export const WrapMessageSt = styled("div")(({ theme }) => ({
  position: "absolute",
  width: "88%",
  maxWidth: 600,
  backgroundColor: theme.color.background,
  border: "1px solid #fff",
  padding: "30px 12px",

  borderRadius: "6px",
  top: `50%`,
  left: `50%`,
  transform: `translate(-50%, -50%)`,
  boxSizing: "border-box",
}))

//   boxShadow: theme.shadows[5],
// padding: theme.spacing(2, 4, 3),
