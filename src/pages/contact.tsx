import { graphql } from "gatsby"
import React from "react"
import Layout from "../components/Layout/Layout"
import SEO from "../components/seo"

const Contact = ({ location }: { location: Location }) => {
  return (
    <Layout location={location}>
      <SEO title="Contact" />

      <h2
        style={{
          textAlign: "center",
        }}
      >
        vietappeu@gmail.com <br />
      </h2>
    </Layout>
  )
}

export default Contact
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
