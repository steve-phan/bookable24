import React from "react"
import { graphql } from "gatsby"

const DashBoard = (x: any) => {
  console.log(x)
  return (
    <div>
      <h1>Hello from DashBoard</h1>
    </div>
  )
}

export default DashBoard

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
