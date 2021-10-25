import * as React from "react"
import { makeStyles, useTheme } from "@mui/material/styles"
import { ThemeOptions } from "@mui/material"
import { Link, useTranslation } from "gatsby-plugin-react-i18next"

import { PageLinkSt } from "./NavLinks.css"

export const NavLinks = ({ routes }: any) => {
  const theme = useTheme<ThemeOptions>()
  const { t } = useTranslation()
  return (
    <div>
      {routes.map((route: any, i: number) => (
        <React.Fragment key={i}>
          <PageLinkSt
            activeStyle={{
              // background: theme.color.activeBackground,
              color: theme.color.primary,
              borderBottom: `2px solid ${theme.color.primary}`,
            }}
            to={route.path}
          >
            {t(`menu.${route.name}`)}
          </PageLinkSt>
        </React.Fragment>
      ))}
    </div>
  )
}
