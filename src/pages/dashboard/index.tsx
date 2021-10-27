import React from "react"
import { graphql } from "gatsby"

import DashBoardLayout from "src/components/Layout/DasBoadLayout"
import HomeDashBoard from "src/components/DashBoard/Home/Home"

const DashBoardHome = () => {
  return (
    <DashBoardLayout>
      <HomeDashBoard />
    </DashBoardLayout>
  )
}

export default DashBoardHome

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
