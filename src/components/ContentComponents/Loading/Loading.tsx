import * as React from "react"
import { CircularProgress } from "@mui/material"

import { LoadingSt } from "./Loading.styles"

const Loading = () => {
  return (
    <LoadingSt>
      <CircularProgress />
    </LoadingSt>
  )
}

export default Loading
