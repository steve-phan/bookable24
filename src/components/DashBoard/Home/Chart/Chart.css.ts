import { styled, alpha } from "@mui/material/styles"
import { Typography } from "@mui/material"

export const CircleSt = styled("div")(({ theme }) => ({
  width: "100%",
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

export const TypoTitleSt = styled(Typography)(({ theme }) => ({
  textAlign: "center",
}))

export const BarSt = styled(CircleSt)(({ theme }) => ({
  maxWidth: 600,
  maxHeight: 600,
}))
