import React from "react"
import { graphql } from "gatsby"
import { ThemeProvider } from "@mui/material/styles"

import SideBar from "src/components/DashBoard/DashBoardLayout/SideBar"
import Header from "src/components/DashBoard/DashBoardLayout/Header/Header"
import { theme } from "src/utils"

import { WrapDashBoardSt, DashBoardContentSt } from "./dashboard.css"

const DashBoard = (x: any) => {
  console.log(x)
  return (
    <ThemeProvider theme={theme}>
      <WrapDashBoardSt>
        <SideBar />
        <DashBoardContentSt>
          <Header />
          <h1>Hello from DashBoard</h1>
        </DashBoardContentSt>
      </WrapDashBoardSt>
    </ThemeProvider>
  )
}

export default DashBoard

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`
