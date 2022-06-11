import { graphql } from "gatsby"
import React, { useEffect, useState } from "react"
import { useQueryParam, NumberParam, StringParam } from "use-query-params"
import { verifyPasswordResetCode, confirmPasswordReset } from "firebase/auth"

import { auth } from "src/firebase"

type Tmode = "resetPassword" | "recoverEmail" | "verifyEmail"
type ToobCode = string

//bookable24-61ec2.firebaseapp.com/__/auth/action?mode=resetPassword&oobCode=a2gKgZ4JJLx4tNoBk-ZeiAVWoW9JCAHffpgT9VR1soEAAAGBVKGEHg&apiKey=AIzaSyB3ycs7ejcmtHonG_NdzEQzqf-gWJp9sHU&lang=en

const ResetPassword = ({ oobCode }: { oobCode: ToobCode }) => {
  useEffect(() => {
    handleResetPassword()
  }, [])
  const handleResetPassword = async () => {
    try {
      const email = await verifyPasswordResetCode(
        auth,
        (oobCode = "a2gKgZ4JJLx4tNoBk-ZeiAVWoW9JCAHffpgT9VR1soEAAAGBVKGEHg")
      )
      console.log({ email })
    } catch (error) {}
  }
  return (
    <>
      <h1>ResetPassword</h1>
      <button onClick={() => handleResetPassword()}>click</button>
    </>
  )
}
const handleMode = (mode: Tmode, oobCode: ToobCode) => {
  switch (mode) {
    case "resetPassword":
      console.log("do reset password")
      return <ResetPassword oobCode={oobCode} />
    case "recoverEmail":
      console.log("do  recoverEmail")
      return <>recoverEmail</>
    case "verifyEmail":
      console.log("do verifyEmail")
      return <>verifyEmail</>

    default:
      return <>Something wrong</>
  }
}

const Account = () => {
  const [UI, SetUI] = useState()
  const mode = useQueryParam("mode") as unknown as Tmode[]
  const oobCode = useQueryParam("oobCode") as unknown as ToobCode
  const apiKey = useQueryParam("apiKey")

  useEffect(() => {
    // SetUI(handleMode(mode))
  }, [mode])
  console.log({ mode: mode[0] })
  return (
    <div>
      <h1>Account</h1>

      {handleMode(mode[0], oobCode)}
    </div>
  )
}

export default Account

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
