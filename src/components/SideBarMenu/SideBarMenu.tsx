import { ThemeOptions } from "@mui/material"
import { useTheme } from "@mui/styles"
import { useTranslation } from "gatsby-plugin-react-i18next"
import React from "react"
import { routes } from "../../routes"
import { LinkSt, MenuSt, SideBarMenuSt } from "./SideBarMenu.css"

const SideBarMenu = () => {
  const { t } = useTranslation()
  const theme = useTheme<ThemeOptions>()
  // console.log(theme)
  return (
    <SideBarMenuSt>
      <MenuSt>
        {routes.map((route, i) => (
          // <Box className={classes.item} key={i}>
          <LinkSt
            key={i}
            activeStyle={{
              backgroundColor: "#f5f5f5",
              // color: theme.color.activeColor,
              borderTopRightRadius: 20,
              borderBottomRightRadius: 20,
            }}
            to={route.path}
          >
            <route.icon /> {t(`menu.${route.name}`)}
          </LinkSt>

          // </Box>
        ))}
      </MenuSt>
    </SideBarMenuSt>
  )
}

export default SideBarMenu
