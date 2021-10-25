import React from "react"
import { graphql } from "gatsby"

import DashBoardLayout from "src/components/Layout/DasBoadLayout"

const TodayBooking = () => {
  return (
    <DashBoardLayout>
      <div>
        <h1>Hello TodayBooking</h1>
      </div>
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
