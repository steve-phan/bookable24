import React from "react"
import { graphql, PageProps } from "gatsby"

import DashBoardLayout from "src/components/Layout/DasBoadLayout"

const ManageBookingPage: React.FC<PageProps> = props => {
  return (
    <DashBoardLayout>
      <h1>Hello</h1>
    </DashBoardLayout>
  )
}

export default ManageBookingPage

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
