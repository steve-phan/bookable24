import { graphql, navigate } from "gatsby"
import React, { useEffect, useState } from "react"
import { useQueryParam, NumberParam, StringParam } from "use-query-params"
import { verifyPasswordResetCode, confirmPasswordReset } from "firebase/auth"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"

import { auth } from "src/firebase"
import Loading from "src/components/ContentComponents/Loading/Loading"
import { async } from "@firebase/util"

const ariaLabel = { "aria-label": "description" }
type Tmode = "resetPassword" | "recoverEmail" | "verifyEmail"
type ToobCode = string

const ResetPassword = () => {
  const mode = useQueryParam("mode")
  const oobCode = useQueryParam("oobCode") as unknown as ToobCode
  const [loading, setLoading] = useState(true)
  const [newPassowrd, setNewpassword] = useState("")
  useEffect(() => {
    mode[0] === "resetPassword" && handleResetPassword()
  }, [])

  if (mode[0] !== "resetPassword") {
    setLoading(false)
    return <h1>Link not exits</h1>
  }

  const handleResetPassword = async () => {
    try {
      const email = await verifyPasswordResetCode(auth, oobCode)
      setLoading(false)
      console.log({ email })
    } catch (error) {
      setLoading(false)
      alert("Code is not valid")
      navigate("/")
    }
  }

  const handleSetNewPasssword = async () => {
    try {
      await confirmPasswordReset(auth, oobCode, newPassowrd)
    } catch (error) {
      console.log({ error })
    }
  }
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Box
          sx={{
            "& > :not(style)": { m: 1 },
            width: "100%",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TextField
            size="small"
            placeholder="Your new Password"
            inputProps={ariaLabel}
            value={newPassowrd}
            onChange={e => setNewpassword(e.target.value)}
          />
          <Button onClick={() => handleSetNewPasssword()}>Submit</Button>
        </Box>
      )}
    </>
  )
}

export default ResetPassword

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
