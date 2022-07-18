import React from "react"

import { WrapLogoSt } from "./logo.styles"
import bookable24 from "./newlogo.png"

const Logo = () => {
  return (
    <WrapLogoSt to="/">
      <img
        width={40}
        height={40}
        src={bookable24}
        alt="BookAble24 Online Booking System"
      />
      <span>Bookable24</span>
    </WrapLogoSt>
  )
}

export default Logo
