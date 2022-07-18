import { useTranslation } from "gatsby-plugin-react-i18next"
import React from "react"

import { routes } from "../../../Layout/routes"
import { LinkSt, MenuSt, SideBarMenuSt } from "./SideBarMenu.styles"

const SideBarMenu = () => {
  const { t } = useTranslation()
  return (
    <SideBarMenuSt>
      <MenuSt>
        {routes.map((route, i) => (
          <LinkSt
            key={i}
            activeStyle={{
              backgroundColor: "#f5f5f5",
              borderTopRightRadius: 20,
              borderBottomRightRadius: 20,
            }}
            to={route.path}
          >
            <route.icon /> {t(`menu.${route.name}`)}
          </LinkSt>
        ))}
      </MenuSt>
    </SideBarMenuSt>
  )
}

export default SideBarMenu
