import React from "react"
import { graphql } from "gatsby"
import { ThemeProvider } from "@mui/material/styles"

import SideBar from "../../components/DashBoard/DashBoardLayout/SideBar"
import { theme } from "../../utils"

const DashBoard = (x: any) => {
  console.log(x)
  return (
    <ThemeProvider theme={theme}>
      <div>
        <SideBar />
        <h1>Hello from DashBoard</h1>
      </div>
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
