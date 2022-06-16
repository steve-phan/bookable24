require("dotenv").config()
import { Handler } from "@netlify/functions"

import { connect } from "../utils/mongooseConnect"
import { shopinfoSchema } from "../utils/models/shopInfoModel"

export const handler: Handler = async function (event) {
  const data = JSON.parse(event.body as string)

  const {
    shopName,
    weekdays,
    time,
    closedRegularDay,
    closedSpecificDay,
    slotTime,
    maxTerminPerSlot,
    terminBefore,
  } = data
  try {
    const shopnamesDb = await connect()
    const Shopinfo = shopnamesDb.model("Shopinfo", shopinfoSchema)

    await Shopinfo.findOneAndUpdate(
      { shopName },
      {
        settings: {
          weekdays,
          time,
          closedRegularDay,
          slotTime,
          terminBefore,
          maxTerminPerSlot,
          closedSpecificDay,
        },
      }
    )

    return {
      statusCode: 200,
      body: "EMAIL_SENT",
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    }
  }
}
