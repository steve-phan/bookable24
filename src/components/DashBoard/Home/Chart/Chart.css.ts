import { styled, alpha } from "@mui/material/styles"

export const CircleSt = styled("div")(({ theme }) => ({
  maxWidth: 280,
  maxHeight: 280,
  padding: "16px",
  position: "relative",
  display: "flex",
  // flexDirection: 'column',
  margin: "0 auto",
  justifyContent: "center",
  alignItems: "center",
}))

export const NumberSt = styled("div")(({ theme }) => ({
  position: "absolute",
  fontSize: 38,
  color: theme.color.white,
  fontWeight: "bold",
}))
