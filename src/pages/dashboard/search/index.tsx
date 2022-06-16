import React from "react"
import { graphql } from "gatsby"

import DashBoardLayout from "src/components/Layout/DasBoadLayout"
import SearchCustomer from "src/components/DashBoard/SearchCustomer/SearchCustomer"

const Search = () => {
  return (
    <DashBoardLayout>
      <SearchCustomer />
    </DashBoardLayout>
  )
}

export default Search

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
