import { Handler } from "@netlify/functions"
require("dotenv").config()

import { customerSchema } from "../utils/models/customerModel"
import { connect } from "../utils/mongooseConnect"

export const handler: Handler = async event => {
  const { searchTerm, shopId } = JSON.parse(event.body) as {
    searchTerm: string
    shopId: string
  }
  console.log({ searchTerm, shopId })
  try {
    /**
     * @useCase : to access to multiple databases
     *
     */
    const shopNamesDb = await connect()

    // This is the global connection, so we can use Model directly
    // const shopInfo = await ShopInfo.findOne({
    //   email: shopemail.toLowerCase(),
    // })
    // Next we use useDb method to connect to another database
    const shopTerminsDb = shopNamesDb.connection.useDb(shopId)
    // Define a Model here base on the Schema
    const Customer = shopTerminsDb.model("Customer", customerSchema)
    // Access to Model method

    // $or: [
    //   { Title: { $regex: searchTermRegex } },
    //   { Director: { $regex: searchTermRegex } },
    //   { Plot: { $regex: searchTermRegex } },
    // ],
    const searchTermRegex = new RegExp(searchTerm.replace("+", ""), "i")

    const customers = await Customer.find({
      $or: [
        { firstName: { $regex: searchTermRegex } },
        { lastName: { $regex: searchTermRegex } },
        { phone: { $regex: searchTermRegex } },
        { email: { $regex: searchTermRegex } },
      ],
    })
    return {
      statusCode: 200,
      body: JSON.stringify({ customers }),
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}
