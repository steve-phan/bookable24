import mongoose from "mongoose"

import { getUrl } from "./utils"

let conn: Promise<typeof import("mongoose")> = null

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
  return conn
}
