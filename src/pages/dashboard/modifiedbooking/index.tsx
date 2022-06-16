import React from "react"
import { graphql } from "gatsby"

import DashBoardLayout from "src/components/Layout/DasBoadLayout"
import ModifedBooking from "src/components/DashBoard/ModifiedBooking/ModifiedBooking"

const TodayBooking = () => {
  return (
    <DashBoardLayout>
      <ModifedBooking />
    </DashBoardLayout>
  )
}

export default TodayBooking

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
