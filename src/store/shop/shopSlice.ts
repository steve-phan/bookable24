import { onAuthStateChanged } from "@firebase/auth"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

import { auth } from "src/firebase"

import { getShopName } from "src/utils"
import { AppThunk } from "../store"
import { IshopState } from "./shop.types"

export const checkUserAuth =
  (shopList: any[]): AppThunk =>
  (dispatch, getState) => {
    if (typeof window !== undefined) {
      onAuthStateChanged(auth, user => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const shopname = getShopName(user?.email, shopList)
          dispatch(
            getShopinfo({
              shopemail: user?.email || "",
              shopname,
            })
          )
        } else {
          dispatch(setShopLogout())
        }
      })
    }
  }

const intinitialShopState: IshopState = {
  shopInfo: {
    city: "",
    cityCode: "",
    company: "",
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    shopName: "",
    street: "",
    uid: "",
  },
  isShopLogin: false,
  status: "loading",
  allTermins: [],
}

// export const getShopinfo = createAsyncThunk(
//   "shop/getShopInfo",
//   async (shopName: string) => {
//     const response: any = await axios.post(
//       "/.netlify/functions/check-shop-list",
//       {
//         shopName,
//       }
//     )
//     return response.data.shopInfo
//   }
// )

interface IshopQuery {
  shopemail: string
  shopname: string
  pathname?: string
}

export const getShopinfo = createAsyncThunk(
  "shop/getShopInfo",
  async ({ shopemail, shopname, pathname }: IshopQuery) => {
    const isShopLogin = pathname && pathname === "login"
    const response: any = await axios.get(
      "/.netlify/functions/get-shop-termins",
      {
        headers: {
          shopemail,
          shopname,
        },
      }
    )
    const { allTermins, shopInfo } = response.data
    return { allTermins, shopInfo, isShopLogin }
  }
)

export const shopSlice = createSlice({
  name: "shop",
  initialState: intinitialShopState,
  reducers: {
    setShopInfo: (state, action) => {
      state.status = "login"
      state.isShopLogin = true
      state.shopInfo = action.payload
    },

    setShopLogout: state => {
      state.status = "logout"
      state.isShopLogin = false
      state.shopInfo = intinitialShopState.shopInfo
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getShopinfo.pending, (state: IshopState) => {
        state.status = "loading"
      })
      .addCase(getShopinfo.fulfilled, (state, action) => {
        state.status = action.payload.isShopLogin ? "login" : "logout"
        state.isShopLogin = action.payload.isShopLogin ? true : false
        state.shopInfo = action.payload.shopInfo
        state.allTermins = action.payload.allTermins
      })
      .addCase(getShopinfo.rejected, state => {
        state.status = "logout"
      })
  },
})

export const { setShopInfo, setShopLogout } = shopSlice.actions

export default shopSlice.reducer
