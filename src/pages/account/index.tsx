import { graphql } from "gatsby"
import React from "react"

//bookable24-61ec2.firebaseapp.com/__/auth/action?mode=resetPassword&oobCode=a2gKgZ4JJLx4tNoBk-ZeiAVWoW9JCAHffpgT9VR1soEAAAGBVKGEHg&

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
