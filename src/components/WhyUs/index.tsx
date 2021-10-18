import React from "react"
import { Container, Grid, ThemeOptions } from "@mui/material"
import { makeStyles, useTheme } from "@mui/styles"

import {
  BrushOutlined,
  CheckCircleOutline,
  EventAvailable,
  HourglassEmpty,
  ThumbUpOutlined,
  TrendingUp,
} from "@mui/icons-material"
import { Link, useTranslation } from "gatsby-plugin-react-i18next"

const getIcon = (
  num: number,
  color = "#e84b63",
  fontSize = 35
): JSX.Element => {
  switch (num) {
    case 1:
      return <TrendingUp style={{ fontSize, color }} />
    case 2:
      return <EventAvailable style={{ fontSize, color }} />
    case 3:
      return <HourglassEmpty style={{ fontSize, color }} />
    case 4:
      return <ThumbUpOutlined style={{ fontSize, color }} />
    case 5:
      return <BrushOutlined style={{ fontSize, color }} />
    case 6:
      return <CheckCircleOutline style={{ fontSize, color }} />

    default:
      return <></>
  }
}

const useStyles = makeStyles(theme => ({
  card: {
    // border: "1px solid red",

    boxShadow: "0 0.125rem 1.25rem 0 rgb(86 93 100 / 10%)",

    "&:hover": {
      //   backgroundColor: "red",
      transform: "scale(1.01)",
    },
  },
  center: {
    display: "flex",
    justifyContent: "center",

    paddingTop: 16,
    // background: "radial-gradient(#d6e1ff, transparent)",
  },
  howContent: {
    padding: 15,
    color: "#615e5e",
    marginBottom: 20,
    textAlign: "center",
  },
}))

const WhyUs = () => {
  const { t } = useTranslation()
  const theme = useTheme<ThemeOptions>()

  const classes = useStyles()
  const data = [...Array(6)].map((_, i) => t(`whyus.item${i + 1}`))
  return (
    <Container style={{ marginTop: 40, marginBottom: 20, padding: 8 }}>
      <Grid container style={{ marginTop: 20 }}>
        {data.map((item: string, i: number) => (
          <Grid className={classes.card} item xs={12} sm={6} key={i}>
            <Container className={classes.center}>
              {getIcon(i + 1, theme.color.iconColor)}
            </Container>

            <Container className={classes.howContent}>{item}</Container>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default WhyUs
