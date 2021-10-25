import React from "react"
import { graphql } from "gatsby"

import DashBoardLayout from "src/components/Layout/DasBoadLayout"

const TomorrowBooking = () => {
  return (
    <DashBoardLayout>
      <div>
        <h1>Hello TomorrowBooking</h1>
      </div>
    </DashBoardLayout>
  )
}

export default TomorrowBooking

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