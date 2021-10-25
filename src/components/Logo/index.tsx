import React, { useMemo } from "react"
import { StaticImage } from "gatsby-plugin-image"

import { WrapLogoSt } from "./logo.css"

const Logo = () => {
  return (
    <WrapLogoSt to="/">
      <StaticImage
        src="../../images/bookable24.png"
        alt="BookAble Online Booking System"
        placeholder="blurred"
        layout="fixed"
        width={40}
        height={40}
      />
      <span>ookable24</span>
    </WrapLogoSt>
  )
}

export default Logo
