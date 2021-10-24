import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

export interface IshopInfo {
  city: string
  cityCode: string
  company: string
  email: string
  firstName: string
  lastName: string
  phoneNumber: string
  shopName: string
  street: string
  uid?: string
}

export interface IshopState {
  shopInfo: IshopInfo | unknown
  status: "idle" | "loading" | "failed"
  isShopLogin: boolean
  allTermins: any[]
}

export interface Iaccount {
  email: string
  password: string
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
  status: "idle",
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
}

export const getShopinfo = createAsyncThunk(
  "shop/getShopInfo",
  async ({ shopemail, shopname }: IshopQuery) => {
    const response: any = await axios.get(
      "/.netlify/functions/get-shop-termins",
      {
        headers: {
          shopemail,
          shopname,
        },
      }
    )
    console.log("data received", response)
    const { allTermins, shopInfo } = response.data
    return { allTermins, shopInfo }
  }
)

export const shopSlice = createSlice({
  name: "shop",
  initialState: intinitialShopState,
  reducers: {
    setShopInfo: (state, action) => {
      state.shopInfo = true
      state.shopInfo = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getShopinfo.pending, (state: IshopState) => {
        state.status = "loading"
      })
      .addCase(getShopinfo.fulfilled, (state, action) => {
        state.status = "idle"
        state.isShopLogin = true
        state.shopInfo = action.payload.shopInfo
        state.allTermins = action.payload.allTermins
      })
  },
})

export const { setShopInfo } = shopSlice.actions

export default shopSlice.reducer
