import React from "react"
import { graphql, PageProps } from "gatsby"

import DashBoardLayout from "src/components/Layout/DasBoadLayout"

const TodayBooking: React.FC<PageProps> = props => {
  console.log({ state: props?.location.state })
  return (
    <DashBoardLayout>
      <h1>Hello</h1>
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
