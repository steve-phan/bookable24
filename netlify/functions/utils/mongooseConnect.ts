import mongoose from "mongoose"

import { getUrl } from "./utils"

let conn = null

// const uri = 'YOUR CONNECTION STRING HERE';

export const connect = async function () {
  let url = getUrl("shopnames")

  if (conn == null) {
    conn = mongoose
      .connect(url, {
        serverSelectionTimeoutMS: 5000,
      })
      .then(() => mongoose)

    // `await`ing connection after assigning to the `conn` variable
    // to avoid multiple function calls creating new connections
    await conn
  }
  // } else if (mongoose.connections[0]?.name !== dbName) {
  //   // console.log("check ==>", mongoose.connection.name, dbName)
  //   conn = mongoose.connection.useDb(dbName)
  //   // mongoose
  //   //   .connect(url, {
  //   //     serverSelectionTimeoutMS: 5000,
  //   //   })
  //   //   .then(() => mongoose)
  // }
  console.log("connections", mongoose.connections[0].name)
  return conn
}
