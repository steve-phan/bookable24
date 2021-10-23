import { TextField, Typography, FormControl, Button } from "@mui/material"
import { alpha, styled, ThemeOptions } from "@mui/material/styles"

export const TextFieldSt = styled(TextField)(({ theme }) => ({
  marginBottom: 24,
  width: "100%",
  maxWidth: "560px",
  backgroundColor: theme.color.background,

  "& label.Mui-focused": {
    color: theme.color.primary,
  },
  "& >:after": {
    borderBottom: `1px solid ${theme.color.primary} !important`,
  },
}))

export const TypographySt = styled(Typography)(({ theme }) => ({
  fontSize: 16,
  color: "#333",
  marginBottom: 16,
  //   borderLeft: `2px solid red`,
}))

export const FormControlSt = styled(FormControl)(({ theme }) => ({
  marginBottom: 24,

  width: "100%",
  "& label.Mui-focused": {
    color: theme.color.primary,
  },
  "& >:after": {
    borderBottom: `1px solid ${theme.color.primary} !important`,
  },
}))

export const ButtonSt = styled(Button)(({ theme }) => ({
  background: theme.color.primary,
  fontWeight: "bold",
  width: "100%",
  marginTop: 24,

  "&:hover": {
    background: alpha(theme.color.primary, 0.6),
  },
}))
