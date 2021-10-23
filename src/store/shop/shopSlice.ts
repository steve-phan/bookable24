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
  uid: string
}

export interface IshopState {
  shopInfo: IshopInfo | unknown
  status: "idle" | "loading" | "failed"
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
  status: "idle",
}

export const getShopinfo = createAsyncThunk(
  "shop/getShopInfo",
  async (shopName: string) => {
    const response: any = await axios.post(
      "/.netlify/functions/check-shop-list",
      {
        shopName,
      }
    )
    return response.data.shopInfo
  }
)

export const shopSlice = createSlice({
  name: "shop",
  initialState: intinitialShopState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getShopinfo.pending, (state: IshopState) => {
        state.status = "loading"
      })
      .addCase(getShopinfo.fulfilled, (state, action) => {
        state.status = "idle"
        state.shopInfo = action.payload
      })
  },
})

export default shopSlice.reducer
