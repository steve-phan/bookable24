import React from "react"
import { useShopname } from "./src/components/Account/accountHook"
import { useAppDispatch, useAppSelector } from "./src/store/hooks"
import { checkUserAuth } from "./src/store/shop/shopSlice"

const CheckAuth = () => {
  const dispatch = useAppDispatch()
  const { isShopLogin, status } = useAppSelector(state => state.shop)

  const shopList = useShopname()
  React.useEffect(() => {
    // const paths = location?.pathname?.split("/").pop() !== 'login'
    if (
      !isShopLogin &&
      (location?.pathname?.split("/").pop() !== "request-account" ||
        location?.pathname?.split("/").pop() !== "login")
    ) {
      dispatch(checkUserAuth(shopList))
    }
  }, [])
  return <> </>
}
export default CheckAuth
