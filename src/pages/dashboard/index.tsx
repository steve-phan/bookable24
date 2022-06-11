import React from "react"
import { graphql } from "gatsby"

import DashBoardLayout from "src/components/Layout/DasBoadLayout"
import HomeDashBoard from "src/components/DashBoard/Home/Home"
import WithAuth from "src/components/ContentComponents/WithAuth/WithAuth"
import SEO from "src/components/seo"

const DashBoardHome = () => {
  return (
    <DashBoardLayout>
      <SEO title="Dashboard Management Bookable24 System" />
      <WithAuth />
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
