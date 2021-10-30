import { Handler } from "@netlify/functions"
import mongoose, { Document } from "mongoose"
require("dotenv").config()
const Schema = mongoose.Schema

const personSchme = new Schema({
  name: String,
  age: Number,
})

export const handler: Handler = async (event, context) => {
  const { name = "stranger" } = event.queryStringParameters

  const newPerson = {
    name: "Luna",
    age: 100,
  }

  try {
    const url = `mongodb+srv://teddy:${process.env.MONGO_PASSWORD}@cluster0.nanpu.mongodb.net/person?retryWrites=true&w=majority`
    await mongoose.connect(url)

    // const xxxPerson = new Person({ ...newPerson })
    let x
    personSchme.pre("findOneAndUpdate", async function (doc) {
      // console.log("doc====>", doc)
      const oldAge = await this.model.find({ age: 150 })
      // console.log("oldAge", oldAge)
      // if (oldAge[0]["age"] < 155) {
      //   this.update({ age: 160 })
      // }
      // if (doc[1]["age"] < 101) {
      //   console.log(typeof doc[1])
      // }
      // const xPerson = await Person.find({})

      // if (xPerson[0].age > 20) {
      //   Person.updateOne({ age: xPerson[0].age }, { age: 20 })
      // }
    })
    const Person = mongoose.model("Person", personSchme)

    const result = await Person.findOneAndUpdate({}).exec()

    console.log("result ", mongoose.connection.name)

    mongoose.connection.close()
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `Hello,  success ${name}!`,
      }),
    }
  } catch (error) {
    mongoose.connection.close()

    console.log("mongooerror", error)
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: `Hello, error ${name}!`,
      }),
    }
  }
}
