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
  isFormDirty: false,
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
      state.isValidInfo = true
    },
    setCustomerValidInfo: (
      state: IBookingState,
      action: PayloadAction<boolean>
    ) => {
      state.isValidInfo = action.payload
    },
    setFormDirty: (state: IBookingState, action: PayloadAction<boolean>) => {
      state.isFormDirty = action.payload
    },
  },
})
export const {
  setNumberOfCustomer,
  setSelectedDate,
  setSelectedSlot,
  setCustomerInfo,
  setCustomerValidInfo,
  setFormDirty,
} = bookingSlice.actions

export default bookingSlice.reducer
