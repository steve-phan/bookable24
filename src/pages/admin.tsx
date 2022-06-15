import axios from "axios"
import { graphql } from "gatsby"
import React, { useState } from "react"

const Admin = () => {
  const [state, setState] = useState("")
  return (
    <div>
      <form>
        <input
          value={state}
          type="text"
          onChange={e => {
            setState(e.target.value)
          }}
        />
        <button
          onClick={e => {
            e.preventDefault()
            axios
              .post(
                "/.netlify/functions/refactor-add-restaurant-customer",
                JSON.stringify({ shopId: state })
              )
              .then(res => {
                console.log({ Status: res })
              })
              .catch(err => {
                console.error({ err })
              })
          }}
        >
          submit
        </button>
      </form>
    </div>
  )
}

export default Admin

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
