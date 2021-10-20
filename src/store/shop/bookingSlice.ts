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
export const setNumberOfGuest = createAction<number>("booking/number-of-guest")

const bookingReducers = createReducer(initialBookingState, builder => {
  builder.addCase(setNumberOfGuest, (state: IbookingState, action) => {
    console.log("dispatch", action.payload)
    state.numberOfGuest = action.payload
  })
})

const bookingSlice = createSlice({
  name: "booking",
  initialState: initialBookingState,
  reducers: { ...bookingReducers },
  //    {
  //     bookingReducers,
  //     setNumberOfGuest: (state, action: PayloadAction<number>) => {
  //       state.numberOfGuest = action.payload
  //     },
  //   },
})
// export const { bookingReducers } = bookingSlice.actions

export default bookingReducers
