import { CircularProgress, makeStyles } from "@material-ui/core"
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
  },
  wrapShop: {
    backgroundColor: "black",
    zIndex: 2021,
    position: "fixed",
    width: "100vw",
    height: "100vh",
    left: 0,
    top: 0,
  },
  progress: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    width: "fit-content",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  icon: {
    color: theme.palette.primary.main,
  },
  logo: {
    color: "#e84b63",
    // transform: 'translateX(-42%)',
  },
}))

const Loading = ({ shopname = "BookAble24" }) => {
  const classes = useStyles()
  return (
    <div className={!shopname ? classes.wrapModal : classes.wrapShop}>
      <div className={classes.progress}>
        <CircularProgress className={classes.icon} />
        <h1 className={classes.logo}>{shopname}</h1>
      </div>
    </div>
  )
}

export default Loading
