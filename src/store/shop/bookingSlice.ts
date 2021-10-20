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
  slot: number
}

const initialBookingState: IbookingState = {
  numberOfGuest: 1,
  selectedDate: new Date(),
  slot: 1,
}
// export const bookingNumberOfGuest = createAction<number>(
//   "booking/number-of-guest"
// )

// export const bookingReducers = createReducer(initialBookingState, builder => {
//   builder.addCase(bookingNumberOfGuest, (state: IbookingState, action) => {
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
  },
})
export const { setNumberOfGuest } = bookingSlice.actions

export default bookingSlice.reducer
