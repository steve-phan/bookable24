// https://webpack.js.org/guides/typescript/#importing-other-assets
declare module "react-helmet"
declare module "@contentful/rich-text-html-renderer"
declare module "*.svg" {
  const content: any
  export default content
}
