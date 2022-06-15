import { graphql, PageProps } from "gatsby"
import React from "react"
import { useQueryParam } from "use-query-params"

import CancelBooking from "src/components/CancelBooking/CancelBooking"
import Layout from "src/components/Layout/Layout"

const CancelBookingPage: React.FC<PageProps> = ({ location }) => {
  const shopId = useQueryParam("shopId")[0] as string
  const bookingId = useQueryParam("bookingId")[0] as string

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
