import { Link } from "gatsby-plugin-react-i18next"
import { styled } from "@mui/material/styles"
import { StaticImage } from "gatsby-plugin-image"
import * as React from "react"

export const CTAButtons = styled(Link)`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.color.white};
  background-color: ${({ theme }) => theme.color.primary};
  padding: 12px 20px;
  cursor: pointer;
  border-radius: 20px;
  text-transform: uppercase;
`

export const LoginButton = styled(CTAButtons)`
  padding: 10px 16px;
  /* width: fit-content; */
  /* width: 120px; */
  margin: 0 auto;
`
export const WrapLoginSt = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
}))

export const WrapLoginMobileSt = styled("div")`
  display: flex;
  place-items: center;
  padding: 10px 28px;
  border-bottom: 1px solid white;
`

export const BackgroundSt = () => {
  return (
    <StaticImage
      src="./background.jpg"
      alt="Bookable24 Background"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: -1,
        opacity: 0.6,
      }}
    />
  )
}
