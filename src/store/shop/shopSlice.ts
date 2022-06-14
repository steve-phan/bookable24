import { async } from "@firebase/util"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios, { ResponseType, AxiosResponse } from "axios"
import { onAuthStateChanged } from "firebase/auth"

import { auth } from "src/firebase"
import { getShopName } from "src/utils"

import { AppThunk } from "../store"
import {
  IShopState,
  IshopQuery,
  IShopInfo,
  IbookingState,
  IShop,
  ITermin,
} from "./shop.types"

export const checkUserAuth =
  (shopList: IShop[]): AppThunk =>
  (dispatch, getState) => {
    if (typeof window !== "undefined") {
      onAuthStateChanged(auth, user => {
        if (user?.email) {
          const shopId = getShopName(user.email, shopList)
          dispatch(
            getShopinfo({
              shopemail: user?.email || "",
              shopId: shopId as string,
              isShopLogin: true,
            })
          )
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          // const uid = user.uid
        } else {
          dispatch(setShopLogout())
        }
      })
    }
  }

const initialCancelTermin = {
  selectedDate: "",
  selectedSlot: "",
  last_name: "",
  first_name: "",
  require: "",
  person: "",
  email: "",
  phone: "",
  status: false,
  canceled: false,
}

const intinitialShopState: IShopState = {
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
      slotTime: "22:00",
      closedRegularDay: "none",
      closedSpecificDay: [],
      weekdays: [],
      terminBefore: 2,
      maxTerminPerSlot: 2,
    },
  },
  isShopLogin: false,
  status: "loading",
  allTermins: [],
  isFetching: false,
  cancelTermin: { ...initialCancelTermin },
}

export const getShopinfo = createAsyncThunk(
  "shop/getShopInfo",
  async ({ shopemail, shopId, isShopLogin }: IshopQuery) => {
    const response: AxiosResponse = await axios.get(
      "/.netlify/functions/get-shop-termins",
      {
        headers: {
          shopemail,
          shopId,
        },
      }
    )
    const { allTermins, shopInfo } = response.data as {
      allTermins: ITermin[]
      shopInfo: IShopInfo
    }
    return { allTermins, shopInfo, isShopLogin }
  }
)

interface ITerminCancelProps {
  bookingId: string
  shopId: string
}

export const getCancelTermin = createAsyncThunk(
  "shop/getCancelTermin",
  async ({ bookingId, shopId }: ITerminCancelProps) => {
    const response: AxiosResponse = await axios.post(
      "/.netlify/functions/cancel-termin",
      JSON.stringify({ bookingId, shopId })
    )

    const { appointmentFound, shopInfo } = response.data as {
      appointmentFound: ITermin
      shopInfo: IShopInfo
    }
    return { appointmentFound, shopInfo }
  }
)

export const confirmCancelTermin = createAsyncThunk(
  "shop/confirmCancelTermin",
  async ({ bookingId, shopId }: ITerminCancelProps) => {
    const response: AxiosResponse = await axios.get(
      "/.netlify/functions/cancel-termin",
      {
        headers: {
          shopId,
          bookingId,
        },
      }
    )

    return response.data
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
    setSettingsDisableSlot: (state, action) => {
      if (action.payload) {
        state.shopInfo.settings.slotTime = action.payload
      }
    },
    setSetingsRegularDays: (state, action) => {
      state.shopInfo.settings.weekdays = action.payload
    },
    setSetingsTerminBefore: (state, action) => {
      state.shopInfo.settings.terminBefore = action.payload
    },
    setSetingsMaxTerminPerSlot: (state, action) => {
      state.shopInfo.settings.maxTerminPerSlot = action.payload
    },
    setSetingsClosedRegularDay: (state, action) => {
      state.shopInfo.settings.closedRegularDay = action.payload
    },
    setSetingsClosedSpecificDay: (state, action) => {
      state.shopInfo.settings.closedSpecificDay = [
        ...state.shopInfo.settings.closedSpecificDay,
        action.payload,
      ]
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getShopinfo.pending, (state: IShopState) => {
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
        const {
          time,
          weekdays,
          slotTime,
          closedRegularDay,
          closedSpecificDay = [],
          maxTerminPerSlot,
          terminBefore,
        } = settings || {}
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
              closedRegularDay,
              closedSpecificDay,
              weekdays,
              slotTime,
              terminBefore,
              maxTerminPerSlot,
            },
          },
        }
      })
      .addCase(getShopinfo.rejected, state => {
        state.status = "logout"
      })
      /**
       * @function getCancelTermin
       */
      .addCase(getCancelTermin.pending, (state: IShopState) => {
        state.isFetching = true
      })
      .addCase(getCancelTermin.fulfilled, (state: IShopState, action) => {
        const { appointmentFound, shopInfo } = action.payload
        state.isFetching = false
        state.cancelTermin = appointmentFound
        state.shopInfo = shopInfo
      })
      .addCase(getCancelTermin.rejected, (state: IShopState) => {
        state.isFetching = false
      })
      /**
       * @function confirmCancelTermin
       */
      .addCase(confirmCancelTermin.pending, (state: IShopState) => {
        state.isFetching = true
      })
      .addCase(confirmCancelTermin.fulfilled, (state: IShopState) => {
        state.isFetching = false
        state.cancelTermin.canceled = true
      })
      .addCase(confirmCancelTermin.rejected, (state: IShopState) => {
        state.isFetching = false
      })
  },
})

export const {
  setShopInfo,
  setShopLogout,
  setSetingsClosedRegularDay,
  setSetingsClosedSpecificDay,
  setSetingsRegularDays,
  setSettingDisableTime,
  setSettingsDisableSlot,
  setSetingsTerminBefore,
  setSetingsMaxTerminPerSlot,
} = shopSlice.actions

export default shopSlice.reducer
