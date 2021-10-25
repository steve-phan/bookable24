import { styled } from "@mui/material/styles"
import { Link } from "gatsby-plugin-react-i18next"

export const WrapLogoSt = styled(Link)(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",

  "& span": {
    color: theme.color.primary,
    fontWeight: 600,
  },
}))
