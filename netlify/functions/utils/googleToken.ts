import { Document } from "mongoose"
import { google } from "googleapis"

import { connect } from "./mongooseConnect"
import { tokenSchema } from "./models/tokenModel"
import { getUrl } from "./utils"

// const url = `mongodb+srv://teddy:${process.env.MONGO_PASSWORD}@cluster0.nanpu.mongodb.net/token?retryWrites=true&w=majority`

interface IToken {
  _id?: unknown
  expiry?: string
  token?: string
}
type TTokenData = Document<any, any, unknown> & IToken

export const getValidToken = async () => {
  let validToken = null
  const oAuth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  )
  oAuth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
  })

  const tokenDB = await connect("token")

  tokenSchema.pre("findOneAndUpdate", async function () {
    const tokenData: TTokenData[] = await this.model.find({})
    if (Number(tokenData[0].expiry) - Date.now() < 3 * 60 * 1000) {
      console.log("token ==>   expired ")
      const {
        token,
        res: {
          data: { expiry_date },
        },
      } = await oAuth2Client.getAccessToken()
      validToken = token
      this.update({
        token: token,
        expiry: expiry_date,
      })
    } else {
      console.log("token ==>    not expiry ")
      validToken = tokenData[0].token
    }
  })

  await tokenDB.model("token", tokenSchema).findOneAndUpdate({})

  return validToken
}
