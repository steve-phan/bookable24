import * as React from "react"
import { CircularProgress } from "@mui/material"

import { LoadingSt } from "./Loading.css"

const Loading = () => {
  return (
    <LoadingSt>
      <CircularProgress />
    </LoadingSt>
  )
}

export default Loading
