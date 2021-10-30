import React from "react"
import { useI18next } from "gatsby-plugin-react-i18next"

import { useAppSelector } from "src/store/hooks"

export interface IPrivateRoute {
  component: React.ReactNode
  location?: any
  path: string
}

const PrivateRoute: React.FC<IPrivateRoute> = ({
  component: Component,
  location,
  path,
  ...rest
}) => {
  const { navigate } = useI18next()
  const { isShopLogin } = useAppSelector(state => state.shop)
  console.log("location", location)
  if (!isShopLogin && location.pathname !== `/login`) {
    navigate("/login")
    return null
  }
  //@ts-ignore
  return <Component {...rest} />
}
export default PrivateRoute
