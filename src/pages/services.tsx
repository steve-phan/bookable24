import React from "react"
import { graphql } from "gatsby"
import { Link, Trans, useTranslation } from "gatsby-plugin-react-i18next"
import { Button } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import Layout from "../components/Layout/Layout"
import SEO from "../components/seo"
const Menu = () => {
  const { t } = useTranslation()

  return (
    <Layout>
      <h3>
        <a href="https://bookable24.de">Online Booking System</a>
      </h3>
    </Layout>
  )
}

export default Menu
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
