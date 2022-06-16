import { graphql, Link } from "gatsby"
import React, { useEffect, useState } from "react"
import { useQueryParam } from "use-query-params"
import { verifyPasswordResetCode, confirmPasswordReset } from "firebase/auth"
import TextField from "@mui/material/TextField"
import { useI18next } from "gatsby-plugin-react-i18next"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import { alpha, styled } from "@mui/material/styles"

import { auth } from "src/firebase"
import Loading from "src/components/ContentComponents/Loading/Loading"
import Layout from "src/components/Layout/Layout"

export const ColumnCenterBoxSt = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 60vh;
`

export const InfoBoxSt = styled(Box)`
  max-width: 350px;
  padding: 16px;
  text-align: center;
  margin-bottom: 24px;
`

export const ButtonSt = styled(Button)(({ theme }) => ({
  background: theme.color.primary,
  fontWeight: "bold",
  width: 222,
  marginTop: 24,
  marginBottom: 16,

  "&:hover": {
    background: alpha(theme.color.primary, 0.6),
  },
}))

const ariaLabel = { "aria-label": "description" }
type ToobCode = string

const ResetPassword = () => {
  const { navigate } = useI18next()
  const mode = useQueryParam("mode")
  const oobCode = useQueryParam("oobCode") as unknown as ToobCode
  const [loading, setLoading] = useState(true)
  const [success, setSccess] = useState(false)
  const [newPassowrd, setNewpassword] = useState("")

  useEffect(() => {
    mode[0] === "resetPassword" && handleResetPassword()
  }, [])

  if (mode[0] !== "resetPassword") {
    if (typeof window !== "undefined") {
      //TODO: need a notice
      alert("The link is not valid")
      navigate("/")
    }
  }

  const handleResetPassword = async () => {
    try {
      const email = await verifyPasswordResetCode(auth, oobCode[0])
      setLoading(false)
    } catch (error) {
      setLoading(false)
      if (typeof window !== "undefined") {
        alert("The link is not valid")
        navigate("/")
      }
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
