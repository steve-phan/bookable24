import { styled } from "@mui/material/styles"

export const LoadingSt = styled("div")(({ theme }) => ({
  position: "absolute",
  zIndex: 2021,
  inset: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: theme.color.white,

  "& svg": {
    color: theme.color.primary,
  },
}))
