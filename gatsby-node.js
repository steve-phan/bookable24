/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it
const { slugify } = require("./utils")
const path = require("path")
const { ShopList } = require("./src/templates/ShopPage/data.ts")

exports.createPages = async ({ graphql, actions, reporter }) => {
  const blogPost = path.resolve("./src/templates/blog-post.js")
  const shopPage = path.resolve("./src/templates/ShopPage/ShopPage.tsx")

  ShopList.forEach((shop, i) => {
    actions.createPage({
      path: `/${shop}/`,
      component: shopPage,
      context: {
        shopName: shop,
      },
    })
  })

  const result = await graphql(`
    {
      allContentfulMyBlog {
        nodes {
          id
          title
        }
      }
    }
  `)
  const posts = result.data.allContentfulMyBlog.nodes

  if (posts.length > 0) {
    posts.forEach((post, index) => {
      const slug = slugify(post.title)
      const previousPostSlug =
        index === 0 ? null : slugify(posts[index - 1].title)
      const nextPostSlug =
        index === posts.length - 1 ? null : slugify(posts[index + 1].title)

      actions.createPage({
        path: `/blog/${slug}`,
        component: blogPost,
        context: {
          slug,
          id: post.id,

          previousPostSlug,
          previousPostId: previousPostSlug ? posts[index - 1].id : null,

          nextPostSlug,
          nextPostId: nextPostSlug ? posts[index + 1].id : null,
        },
      })
    })
  }
}
