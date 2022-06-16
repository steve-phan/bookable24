import axios from "axios"
import dayjs from "dayjs"
import { graphql } from "gatsby"
import React, { useState } from "react"

const Admin = () => {
  const [shopId, setShopId] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div>
      <form>
        <input
          value={shopId}
          type="text"
          onChange={e => {
            setShopId(e.target.value)
          }}
        />
        <input
          value={searchTerm}
          type="text"
          onChange={e => {
            setSearchTerm(e.target.value)
          }}
        />
        <button
          onClick={e => {
            e.preventDefault()
            axios
              .post(
                "/.netlify/functions/search-customer",
                JSON.stringify({ shopId, searchTerm })
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
