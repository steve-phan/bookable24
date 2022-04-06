import { styled } from "@mui/material/styles"

export const LoadingSt = styled("div")(({ theme }) => ({
  position: "fixed",
  zIndex: 2021,
  inset: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#a3a5a387",

  "& svg": {
    color: "#f05123",
  },
}))
