import React from "react"
import { graphql } from "gatsby"

import DashBoardLayout from "src/components/Layout/DasBoadLayout"

const Settings = () => {
  return (
    <DashBoardLayout>
      <div>
        <h1>Hello Setting</h1>
      </div>
    </DashBoardLayout>
  )
}

export default Settings

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
