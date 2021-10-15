import React, { useMemo } from "react"
import { StaticImage } from "gatsby-plugin-image"
import { makeStyles, DefaultTheme } from "@material-ui/styles"

import { styles } from "./logo.css"

const useStyles = makeStyles(styles)

const Logo = () => {
  const classes = useStyles()

  return (
    <div className={classes.logo}>
      <StaticImage
        src="../../images/bookable24.png"
        alt="A dinosaur"
        placeholder="blurred"
        layout="fixed"
        width={40}
        height={40}
      />
      <span>ookable24</span>
    </div>
  )
}

export default Logo
