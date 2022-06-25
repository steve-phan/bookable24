const mongoose = require("mongoose")

const { getUrl } = require("./utils.ts")

/**
 * @type { mongoose.Mongoose } conn
 */

let conn = null

// const uri = 'YOUR CONNECTION STRING HERE';

const connect = async function () {
  let url = getUrl("shopnames")

  if (conn == null) {
    conn = await mongoose.connect(url, {
      serverSelectionTimeoutMS: 5000,
    })

    // `await`ing connection after assigning to the `conn` variable
    // to avoid multiple function calls creating new connections
  }
  return conn
}

module.exports = { connect }
