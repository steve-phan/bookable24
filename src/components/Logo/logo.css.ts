import { styled } from "@mui/material/styles"

export const WrapLogoSt = styled("div")(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",

  "& span": {
    color: theme.color.primary,
    fontWeight: 600,
  },
}))
