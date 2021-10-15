import React from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage, getImage, IGatsbyImageData } from "gatsby-plugin-image"
import { documentToHtmlString } from "@contentful/rich-text-html-renderer"

import Layout from "../components/Layout/Layout"
import { CtaPagesSt, GatsbyImageSt } from "./blog-post.css"

const BlogPost: React.FC = ({ data, pageContext, navigate }: any) => {
  const image = getImage(data.contentfulMyBlog.thumbPicture) as IGatsbyImageData
  return (
    <Layout>
      <GatsbyImageSt image={image} alt="Image" />
      <div
        dangerouslySetInnerHTML={{
          __html: documentToHtmlString(
            JSON.parse(data.contentfulMyBlog.body.raw)
          ),
        }}
      />
      <CtaPagesSt>
        <Link to={`/blog/${pageContext.previousPostSlug}`}>Pre </Link>
        <Link to={`/blog/${pageContext.nextPostSlug}`}>Next </Link>
      </CtaPagesSt>
    </Layout>
  )
}

export default BlogPost

export const pageQuery = graphql`
  query blogPostById($id: String!, $language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    contentfulMyBlog(id: { eq: $id }) {
      title
      body {
        raw
      }
      id
      thumbPicture {
        gatsbyImageData(width: 400, height: 400, cornerRadius: 10)
      }
    }
  }
`
