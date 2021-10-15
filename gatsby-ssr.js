/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/ssr-apis/
 */

// You can delete this file if you're not using it

const React = require("react")

const HeadComponents = [
  <script
    data-ad-client="ca-pub-8740900132177041"
    async
    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
  ></script>,
]

exports.onRenderBody = ({ setHeadComponents }, pluginOptions) => {
  setHeadComponents(HeadComponents)
}
