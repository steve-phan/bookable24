import {
  createSlice,
  createAction,
  createAsyncThunk,
  createReducer,
  PayloadAction,
} from "@reduxjs/toolkit"

interface IbookingState {
  numberOfGuest: number
  selectedDate: Date
  selectedSlot: number
}

const initialBookingState: IbookingState = {
  numberOfGuest: 1,
  selectedDate: new Date(),
  selectedSlot: 18,
}
// export const setNumberOfGuest = createAction<number>("booking/number-of-guest")
// const bookingReducers = createReducer(initialBookingState, builder => {
//   builder.addCase(setNumberOfGuest, (state: IbookingState, action) => {
//     console.log("dispatch", action.payload)
//     state.numberOfGuest = action.payload
//   })
// })

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
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload
    },
  },
})
export const { setNumberOfGuest, setSelectedDate, setSelectedSlot } =
  bookingSlice.actions

export default bookingSlice.reducer
