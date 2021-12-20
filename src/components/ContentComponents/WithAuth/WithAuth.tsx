import React from "react"

import Loading from "src/components/ContentComponents/Loading/Loading"
import { useAppSelector } from "src/store/hooks"

const WithAuth = () => {
  const { isShopLogin, status } = useAppSelector(state => state.shop)
  if (status === "loading" && !isShopLogin) {
    return <Loading />
  } else {
    return <></>
  }
}

export default WithAuth
