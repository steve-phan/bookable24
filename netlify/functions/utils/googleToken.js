const { google } = require("googleapis")

const { tokenSchema } = require("./models/tokenModel")

/**
 * @param { typeof import("mongoose") } shopNamesDb
 */

const getValidToken = async shopNamesDb => {
  let validToken = null
  const oAuth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  )
  oAuth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
  })

  // ***LEARN* https://mongoosejs.com/docs/middleware.html
  tokenSchema.pre("findOneAndUpdate", async function () {
    /**
     * @param { TTokenData }  tokenData
     */

    const tokenData = await this.model.find({})
    //Add 5000(5s) for the token expired in the sametime of the booking process
    if (Number(tokenData[0].expiry) - Date.now() + 5000 < 3 * 60 * 1000) {
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
      validToken = tokenData[0].token
    }
  })

  const tokenDB = shopNamesDb.connection.useDb("token")
  // ***IMPORTANT*** keep await here to execute getToken
  await tokenDB.model("token", tokenSchema).findOneAndUpdate({})

  return validToken
}

module.exports = { getValidToken }
