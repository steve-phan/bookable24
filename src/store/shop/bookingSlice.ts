import {
  createSlice,
  createAction,
  createAsyncThunk,
  createReducer,
  PayloadAction,
} from "@reduxjs/toolkit"

interface IbookingState {
  numberOfGuest: number
  selectedDate: Date | null
  selectedSlot: number
  guestInfo: {
    firstName: string
    lastName: string
    email: string
    phone: string
    require: string
  }
  isValidInfo: boolean
}

const initialBookingState: IbookingState = {
  numberOfGuest: 1,
  selectedDate: new Date(),
  selectedSlot: 18,
  guestInfo: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    require: "",
  },
  isValidInfo: false,
}
// export const setNumberOfGuest = createAction<number>("booking/number-of-guest")
// const bookingReducers = createReducer(initialBookingState, builder => {
//   builder.addCase(setNumberOfGuest, (state: IbookingState, action) => {
//     console.log("dispatch", action.payload)
//     state.numberOfGuest = action.payload
//   })
// })
type TGuestInfo = "firstName" | "lastName" | "email" | "phone" | "require"

const bookingSlice = createSlice({
  name: "booking",
  initialState: initialBookingState,
  reducers: {
    setNumberOfGuest: (state, action: PayloadAction<number>) => {
      state.numberOfGuest = action.payload
    },
    setSelectedSlot: (state, action: PayloadAction<number>) => {
      console.log("action", action)
      state.selectedSlot = action.payload
    },
    setSelectedDate: (state, action: PayloadAction<Date | null>) => {
      state.selectedDate = action.payload
    },
    setGuestInfo: (state, action: PayloadAction<[TGuestInfo, string]>) => {
      state.guestInfo[action.payload[0]] = action.payload[1]
    },
    setGuestValidInfo: (state, action: PayloadAction<boolean>) => {
      console.log("action  =>>>>", action)
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
