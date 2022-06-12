import { graphql } from "gatsby"
import React from "react"

type Tmode = "resetPassword" | "recoverEmail" | "verifyEmail"

const Account = () => {
  return (
    <div>
      <h1>Account Page</h1>
    </div>
  )
}

export default Account

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
