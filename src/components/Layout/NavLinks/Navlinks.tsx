import * as React from "react"
import { useTheme } from "@mui/material/styles"
import { ThemeOptions } from "@mui/material"
import { useTranslation } from "gatsby-plugin-react-i18next"

import { PageLinkSt } from "./NavLinks.styles"

export const NavLinks = ({ routes }: any) => {
  const theme = useTheme<ThemeOptions>()
  const { t } = useTranslation()

  return (
    <div>
      {routes.map((route: any, i: number) => (
        <React.Fragment key={i}>
          <PageLinkSt
            activeStyle={{
              color: theme.color.primary,
              borderBottom: `2px solid ${theme.color.primary}`,
            }}
            to={route.path}
            data-test-id={`test-${route.name}`}
          >
            {t(`menu.${route.name}`)}
          </PageLinkSt>
        </React.Fragment>
      ))}
    </div>
  )
}
