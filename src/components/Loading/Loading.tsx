import { CircularProgress } from "@mui/material"
import { makeStyles } from "@mui/styles"
import React from "react"

const useStyles = makeStyles(theme => ({
  wrapModal: {
    // backgroundColor: 'rgba(255,255,255,0.02)',
    zIndex: 2021,
    position: "fixed",
    backgroundColor: "rgba(0,0,0, 0.3)",
    width: "100vw",
    height: "100vh",
    left: 0,
    top: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}))

const Loading = () => {
  const classes = useStyles()
  return (
    <div className={classes.wrapModal}>
      <CircularProgress />
    </div>
  )
}

export default Loading
