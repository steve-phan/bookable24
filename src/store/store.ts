import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"

import shopReducer from "./shop/shopSlice"
import bookingReducer from "./shop/bookingSlice"

export const appStore = configureStore({
  reducer: {
    shop: shopReducer,
    booking: bookingReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }),
})

export type RootState = ReturnType<typeof appStore.getState>
export type AppDispatch = typeof appStore.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
