// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
require("dotenv").config()
import { Handler } from "@netlify/functions"

const mongoose = require("mongoose")
const { ShopInfo } = require("../utils/config")
const url = `mongodb+srv://teddy:${process.env.MONGO_PASSWORD}@cluster0.nanpu.mongodb.net/shopnames?retryWrites=true&w=majority`

const handler: Handler = async event => {
  const { shopName } = event.body && JSON.parse(event.body)
  console.log(JSON.parse(event.body))

  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useFindAndModify: false,
      // useCreateIndex: true,
    })
    const shop = await ShopInfo.findOne({ shopname: shopName })
    mongoose.connection.close()

    if (shop.shopname === shopName)
      return {
        statusCode: 200,
        body: JSON.stringify({ isShop: true, shopInfo: shop }),
      }
  } catch (error) {
    console.log(error)
    mongoose.connection.close()
    return {
      statusCode: 500,
      body: JSON.stringify({ isShop: false }),
    }
  }
}

module.exports = { handler }
