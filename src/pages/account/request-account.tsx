import { graphql } from "gatsby"
import React from "react"
import { PageProps } from "gatsby"

import Layout from "../../components/Layout/Layout"
import SignUp from "../../components/Account/SignUp/SignUp"
import SEO from "../../components/seo"

const RequestAccount: React.FC<PageProps> = ({ location, data }) => {
  return (
    <Layout location={location}>
      <SEO title="Request Account BookAble24" />
      <SignUp />
    </Layout>
  )
}

export default RequestAccount

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
