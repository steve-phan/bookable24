import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { styled } from "@mui/material/styles"

import BackgroundImage from "gatsby-background-image"

const BackgroundSection = ({ className }: any) => {
  const data = useStaticQuery(
    graphql`
      query {
        desktop: file(relativePath: { eq: "red.svg" }) {
          childImageSharp {
            fluid(quality: 90, maxWidth: 1920) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    `
  )

  // Set ImageData.
  console.log(data)
  const imageData = data.desktop.childImageSharp.fluid

  return (
    <BackgroundImage
      Tag="section"
      className={className}
      fluid={imageData}
      backgroundColor={`#040e18`}
    >
      <h2>gatsby-background-image</h2>
    </BackgroundImage>
  )
}

const RedBackgroundSection = styled(BackgroundSection)`
  width: 100%;
  background-position: bottom center;
  background-repeat: repeat-y;
  background-size: cover;
`

export default RedBackgroundSection
