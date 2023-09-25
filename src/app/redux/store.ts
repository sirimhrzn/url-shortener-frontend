
import { configureStore } from '@reduxjs/toolkit'
import sessionReducer from "./reducers/session"
import allapiReducer from "./reducers/api"
import shortenReducer from "./reducers/createalias"
import deleteReducer from "./reducers/deleteURL"
export const store = configureStore({
  reducer: {
    session: sessionReducer,
    allapi: allapiReducer,
    shorten: shortenReducer,
    deleteURL: deleteReducer,
  }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


