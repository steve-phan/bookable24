import { styled, alpha } from "@mui/material/styles"

export const WrapDaySt = styled("div")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  background: theme.color.background,
}))
export const DaySt = styled("div")(({ theme }) => ({
  padding: "6px 24px",
  flexShrink: 1,
  width: "50%",
}))

export const WrapHourSt = styled("div")(({ theme }) => ({
  padding: 36,
  width: "100%",
  height: "100%",
  display: "inline-flex",
  justifyContent: "space-evenly",
  alignItems: "center",
  "& div ": {
    width: 100,
  },
}))
