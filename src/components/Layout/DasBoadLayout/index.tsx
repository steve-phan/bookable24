import React from "react"
import { graphql } from "gatsby"
import { ThemeProvider } from "@mui/material/styles"

import SideBar from "src/components/Layout/DasBoadLayout/SideBar"
import Header from "src/components/Layout/DasBoadLayout/Header/Header"
import { theme } from "src/utils"

import {
  WrapDashBoardSt,
  DashBoardContentSt,
  WrapContentSt,
} from "./dashboard.css"

export interface IMobileToggle {
  mobileOpen?: boolean
  handleDrawerToggle?: () => void
}

const DashBoardLayout = ({ children }: { children: JSX.Element }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }
  return (
    <ThemeProvider theme={theme}>
      <WrapDashBoardSt>
        <SideBar
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
        />
        <DashBoardContentSt>
          <Header
            mobileOpen={mobileOpen}
            handleDrawerToggle={handleDrawerToggle}
          />

          <WrapContentSt>{children}</WrapContentSt>
        </DashBoardContentSt>
      </WrapDashBoardSt>
    </ThemeProvider>
  )
}

export default DashBoardLayout
