import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { onAuthStateChanged } from "firebase/auth"

import { auth } from "src/firebase"
import { getShopName } from "src/utils"

import { AppThunk } from "../store"
import { IshopState, IshopQuery, IshopInfo } from "./shop.types"

export const checkUserAuth =
  (shopList: any[]): AppThunk =>
  (dispatch, getState) => {
    if (typeof window !== "undefined") {
      onAuthStateChanged(auth, user => {
        if (user?.email) {
          const shopname = getShopName(user.email, shopList)
          dispatch(
            getShopinfo({
              shopemail: user?.email || "",
              shopname,
              isShopLogin: true,
            })
          )
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          // const uid = user.uid
          // ...
        } else {
          // User is signed out
          // ...
          dispatch(setShopLogout())
        }
      })
      // console.log("check Auth localStorage")
      // const user = auth.currentUser
      // if (user?.email) {
      //   console.log("check Auth localStorage, user Logged")
      //   const shopname = getShopName(user.email, shopList)
      //   dispatch(
      //     getShopinfo({
      //       shopemail: user?.email || "",
      //       shopname,
      //       isShopLogin: true,
      //     })
      //   )
      // } else {
      //   // No user is signed in.
      //   dispatch(setShopLogout())
      // }
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
    settings: {
      time: "12:30",
      weekdays: [],
    },
  },
  isShopLogin: false,
  status: "loading",
  allTermins: [],
  settings: {
    time: "12:30",
    weekdays: [],
  },
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

export const getShopinfo = createAsyncThunk(
  "shop/getShopInfo",
  async ({ shopemail, shopname, isShopLogin }: IshopQuery) => {
    const response: any = await axios.get(
      "/.netlify/functions/get-shop-termins",
      {
        headers: {
          shopemail,
          shopname,
        },
      }
    )
    const { allTermins, shopInfo }: { allTermins: any[]; shopInfo: IshopInfo } =
      response.data

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
      state.shopInfo = { ...state.shopInfo, ...action.payload.shopInfo }
    },

    setShopLogout: state => {
      state.status = "logout"
      state.isShopLogin = false
      state.shopInfo = intinitialShopState.shopInfo
    },
    setSettingDisableTime: (state, action) => {
      if (action.payload) {
        state.shopInfo.settings.time = action.payload
      }
    },
    setSetingsDisableDays: (state, action) => {
      state.shopInfo.settings.weekdays = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getShopinfo.pending, (state: IshopState) => {
        state.status = "loading"
      })
      .addCase(getShopinfo.fulfilled, (state, action) => {
        const {
          city,
          cityCode,
          company,
          email,
          firstName,
          lastName,
          phoneNumber,
          shopName,
          street,
          uid,
          settings,
        } = action.payload.shopInfo
        const { time, weekdays } = settings || {}
        const newarr = [
          ...action.payload.allTermins.filter(termin => !termin.status),
        ]
        const isShopLogin = action.payload.isShopLogin ? true : false
        const status = action.payload.isShopLogin ? "login" : "logout"

        return {
          ...state,
          allTermins: [...newarr],
          isShopLogin,
          status,
          shopInfo: {
            city,
            cityCode,
            company,
            email,
            firstName,
            lastName,
            phoneNumber,
            shopName,
            street,
            uid,
            settings: {
              time,
              weekdays,
            },
          },
        }
      })
      .addCase(getShopinfo.rejected, state => {
        state.status = "logout"
      })
  },
})

export const {
  setShopInfo,
  setShopLogout,
  setSetingsDisableDays,
  setSettingDisableTime,
} = shopSlice.actions

export default shopSlice.reducer
