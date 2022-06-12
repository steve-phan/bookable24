import { graphql, Link, navigate } from "gatsby"
import React, { useEffect, useState } from "react"
import { useQueryParam } from "use-query-params"
import { verifyPasswordResetCode, confirmPasswordReset } from "firebase/auth"
import TextField from "@mui/material/TextField"

import { auth } from "src/firebase"
import Loading from "src/components/ContentComponents/Loading/Loading"
import Layout from "src/components/Layout/Layout"

import { ColumnCenterBoxSt, ButtonSt, InfoBoxSt } from "./resetpassword.styles"
import { Typography } from "@mui/material"

const ariaLabel = { "aria-label": "description" }
type ToobCode = string

const ResetPassword = () => {
  const mode = useQueryParam("mode")
  const oobCode = useQueryParam("oobCode") as unknown as ToobCode
  const [loading, setLoading] = useState(true)
  const [success, setSccess] = useState(false)
  const [newPassowrd, setNewpassword] = useState("")

  useEffect(() => {
    mode[0] === "resetPassword" && handleResetPassword()
  }, [])

  if (mode[0] !== "resetPassword") {
    alert("The link is not valid 1")
    navigate("/")
  }

  const handleResetPassword = async () => {
    try {
      console.log({ oobCode })
      const email = await verifyPasswordResetCode(auth, oobCode[0])
      setLoading(false)
      console.log({ email })
    } catch (error) {
      setLoading(false)
      alert("The link is not valid 2")
      navigate("/")
    }
  }

  const handleSetNewPasssword = async () => {
    try {
      await confirmPasswordReset(auth, oobCode[0], newPassowrd)
      setSccess(true)
    } catch (error) {
      console.log({ error })
    }
  }
  return (
    <Layout>
      {loading ? (
        <Loading />
      ) : !success ? (
        <ColumnCenterBoxSt>
          <InfoBoxSt>
            <Typography variant="h5">Passwort ändern</Typography>
            <Typography variant="body2">
              Bitte geben Sie zweimal Ihr neues Passwort ein und klicken Sie
              dann auf Passwort ändern.
            </Typography>
          </InfoBoxSt>
          <TextField
            size="small"
            placeholder="Your new Password"
            inputProps={ariaLabel}
            value={newPassowrd}
            onChange={e => setNewpassword(e.target.value)}
          />
          <ButtonSt variant="contained" onClick={() => handleSetNewPasssword()}>
            Submit
          </ButtonSt>
        </ColumnCenterBoxSt>
      ) : (
        <ColumnCenterBoxSt>
          <InfoBoxSt>
            <Typography variant="body1">
              Herzlichen Glückwunsch, Ihr Passwort wurde erfolgreich geändert.
              Klicken Sie
              <strong>
                <Link to="/login">hier</Link>
              </strong>
              , um sich einzuloggen
            </Typography>
          </InfoBoxSt>
        </ColumnCenterBoxSt>
      )}
    </Layout>
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
