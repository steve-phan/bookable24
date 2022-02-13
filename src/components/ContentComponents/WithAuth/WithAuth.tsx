import * as React from "react"

import Loading from "src/components/ContentComponents/Loading/Loading"
import { useAppSelector } from "src/store/hooks"
import { RootState } from "src/store/store"

const WithAuth = () => {
  const { isShopLogin, status } = useAppSelector(
    (state: RootState) => state.shop
  )
  if (status === "loading" && !isShopLogin) {
    return <Loading />
  } else {
    return <></>
  }
}

export default WithAuth
