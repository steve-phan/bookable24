import * as React from "react"
import { Link } from "gatsby-plugin-react-i18next"
import { styled, alpha } from "@mui/material/styles"
import { StaticImage } from "gatsby-plugin-image"
import Drawer from "@mui/material/Drawer"

export const PageLinkSt = styled(Link)`
  color: inherit;
  margin: 0 8px;
  padding-top: 10px;
  padding-bottom: 4px;
`

export const LinkItemSt = styled(Link)`
  font-size: 16px;
  font-weight: 500;
  padding: 12px 8px;
  margin-top: 6px;
  display: flex;
  align-items: center;
  color: white;

  svg {
    margin-right: 16px;
    margin-left: 16px;
    font-size: 18px;
  }
`

export const WrapLoginMobileSt = styled("div")`
  order: 1;
  display: flex;
  place-items: center;
  padding: 10px 28px;
  border-bottom: 1px solid white;
`

export const DrawerSt = styled(Drawer)(({ theme }) => ({
  "& .MuiPaper-root ": {
    justifyContent: "space-evenly",
  },
}))

export const CTAButtonAccountSt = styled("button")(({ theme }) => ({
  background: theme.color.primary,
  color: theme.color.white,
  border: `1px solid ${theme.color.primary}`,
  borderRadius: 20,
  fontSize: 14,
  fontWeight: 600,
  textTransform: "uppercase",
  padding: "10px 16px",
  cursor: "pointer",

  "&:hover": {
    background: alpha(theme.color.primary, 0.6),
  },
}))

export const BackgroundSt = () => {
  return (
    <StaticImage
      layout="fixed"
      src="./background.jpg"
      alt="Bookable24 Background"
      width={240}
      height={900}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: -1,
        opacity: 0.6,
      }}
    />
  )
}
