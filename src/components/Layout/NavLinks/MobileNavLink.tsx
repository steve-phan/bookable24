import * as React from "react"
import { LinkItemSt } from "./NavLinks.css"
import { makeStyles, useTheme } from "@mui/material/styles"
import { ThemeOptions } from "@mui/material"
import { Link, useTranslation } from "gatsby-plugin-react-i18next"

export const MobileNavLinks = ({ routes }: any) => {
  const theme = useTheme<ThemeOptions>()
  const { t } = useTranslation()
  return (
    <div>
      {routes.map((route: any, i: number) => (
        <LinkItemSt
          key={i}
          activeStyle={{
            backgroundColor: "#f5f5f5",
            color: theme.color.text,
            borderTopLeftRadius: 16,
            borderBottomLeftRadius: 16,
          }}
          to={route.path}
        >
          <route.icon /> {t(`menu.${route.name}`)}
        </LinkItemSt>
      ))}
    </div>
  )
}
