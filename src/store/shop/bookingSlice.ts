import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { IbookingState } from "./shop.types"

const initialBookingState: IbookingState = {
  numberOfGuest: 1,
  selectedDate: new Date(),
  selectedSlot: 0,
  guestInfo: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    require: "",
  },
  isValidInfo: false,
}

export type TGuestInfo =
  | "firstName"
  | "lastName"
  | "email"
  | "phone"
  | "require"

const bookingSlice = createSlice({
  name: "booking",
  initialState: initialBookingState,
  reducers: {
    setNumberOfGuest: (state: IbookingState, action: PayloadAction<number>) => {
      state.numberOfGuest = action.payload
    },
    setSelectedSlot: (state: IbookingState, action: PayloadAction<number>) => {
      state.selectedSlot = action.payload
    },
    setSelectedDate: (state: IbookingState, action: PayloadAction<Date>) => {
      state.selectedDate = action.payload
    },
    setGuestInfo: (
      state: IbookingState,
      action: PayloadAction<[TGuestInfo, string]>
    ) => {
      state.guestInfo[action.payload[0]] = action.payload[1]
    },
    setGuestValidInfo: (
      state: IbookingState,
      action: PayloadAction<boolean>
    ) => {
      state.isValidInfo = action.payload
    },
  },
})
export const {
  setNumberOfGuest,
  setSelectedDate,
  setSelectedSlot,
  setGuestInfo,
  setGuestValidInfo,
} = bookingSlice.actions

export default bookingSlice.reducer
