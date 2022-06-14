import { graphql } from "gatsby"
import React, { useEffect, useState } from "react"
import { useQueryParam } from "use-query-params"
import { useI18next } from "gatsby-plugin-react-i18next"

import Layout from "src/components/Layout/Layout"
import CancelBooking from "src/templates/ShopPage/CancelBooking/CancelBooking"

const CancelBookingPage = () => {
  const shopId = useQueryParam("shopId")[0] as string
  const bookingId = useQueryParam("bookingId")[0] as string
  const { navigate } = useI18next()

  if (!shopId || !bookingId) {
    navigate("/")
  }

  return (
    <Layout>
      <CancelBooking
        bookingId={bookingId}
        shopId={shopId}
        location={location}
      />
    </Layout>
  )
}

export default CancelBookingPage

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
