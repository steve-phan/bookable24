import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import {
  IBookingState,
  IBooking,
  TCustomerInfo,
  IInfoUserProps,
} from "./shop.types"

const intialBooking: IBooking = {
  person: 1,
  selectedDate: new Date(),
  selectedSlot: 0,
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  require: "",
}

const initialBookingState: IBookingState = {
  ...intialBooking,
  isValidInfo: false,
  isSubmitted: false,
}

const bookingSlice = createSlice({
  name: "booking",
  initialState: initialBookingState,
  reducers: {
    setNumberOfCustomer: (
      state: IBookingState,
      action: PayloadAction<number>
    ) => {
      state.person = action.payload
    },
    setSelectedSlot: (state: IBookingState, action: PayloadAction<number>) => {
      state.selectedSlot = action.payload
    },
    setSelectedDate: (state: IBookingState, action: PayloadAction<Date>) => {
      state.selectedDate = action.payload
    },
    setCustomerInfo: (
      state: IBookingState,
      action: PayloadAction<IInfoUserProps>
    ) => {
      const { firstName, lastName, email, phone, require } = action.payload
      state.firstName = firstName
      state.lastName = lastName
      state.email = email
      state.phone = phone
      state.require = require
      state.isSubmitted = true
    },
    setCustomerValidInfo: (
      state: IBookingState,
      action: PayloadAction<boolean>
    ) => {
      state.isValidInfo = action.payload
      if (!action.payload) {
        state.isSubmitted = false
      }
    },
  },
})
export const {
  setNumberOfCustomer,
  setSelectedDate,
  setSelectedSlot,
  setCustomerInfo,
  setCustomerValidInfo,
} = bookingSlice.actions

export default bookingSlice.reducer
