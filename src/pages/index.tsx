import { makeStyles } from "@mui/styles"
import { graphql, PageProps } from "gatsby"
import { useTranslation } from "gatsby-plugin-react-i18next"
import * as React from "react"
import Hero from "../components/Hero"
import Layout from "../components/Layout/Layout"
import SEO from "../components/seo"
import WhyUs from "../components/WhyUs"

const useStyles = makeStyles(theme => ({
  mainButton: {
    background: "red",
  },
}))

const IndexPage: React.FC<PageProps> = ({ location, data }) => {
  const classes = useStyles()
  const { t } = useTranslation()
  // console.log(t("menu")["homepage"])
  return (
    <Layout location={location}>
      <SEO title={t("Home")} />
      <Hero />
      <WhyUs />
    </Layout>
  )
}

export default IndexPage

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
