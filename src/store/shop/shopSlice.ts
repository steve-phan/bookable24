import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"

import { RootState, AppThunk } from "../store"

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
const initialState: IshopState = {
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
    const response = await axios.post("/.netlify/functions/check-shop-list", {
      shopName,
    })
    return response.data
  }
)

export const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getShopinfo.pending, state => {
        state.status = "loading"
      })
      .addCase(getShopinfo.fulfilled, (state, action) => {
        state.status = "idle"
        state.shopInfo = action.payload
      })
  },
})

export default shopSlice.reducer
