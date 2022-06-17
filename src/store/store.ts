import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"

import shopReducer from "./shop/shopSlice"
import bookingReducer from "./shop/bookingSlice"

export const store = configureStore({
  reducer: {
    shop: shopReducer,
    booking: bookingReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
