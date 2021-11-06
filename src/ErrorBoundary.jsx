import React from "react"
import PropTypes from "prop-types"
import * as Sentry from "@sentry/gatsby"

import Layout from "./components/Layout/Layout"
import SEO from "./components/seo"

Sentry.init({
  dsn: "https://bfa58b14270a45fb8067e1dcf45d74e8@o1061869.ingest.sentry.io/6052276",
  sampleRate: 0.5, // Adjust this value in production
  // ...
})

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error })
    Sentry.configureScope(scope => {
      Object.keys(errorInfo).forEach(key => {
        scope.setExtra(key, errorInfo[key])
      })
    })
    Sentry.captureException(error)
  }

  render() {
    if (this.state.error) {
      // render fallback UI
      return (
        <Layout>
          <SEO title="404: Not found" />
          <h1>404: Not Found</h1>

          <p>
            You just hit a route that doesn&#39;t exist... the sadness. Thanks
            Sentry :)
          </p>
        </Layout>
      )
    } else {
      // when there's not an error, render children untouched
      return this.props.children
    }
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.object.isRequired,
}

export default ErrorBoundary
