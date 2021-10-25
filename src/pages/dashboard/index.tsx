import React from "react"
import { graphql } from "gatsby"
import DashBoardLayout from "src/components/Layout/DasBoadLayout"

const DashBoardHome = ({ children }: { children: JSX.Element }) => {
  return (
    <DashBoardLayout>
      <h1>Home DashBoard</h1>
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
