import { PayloadAction, createAsyncThunk, createSlice, } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";

export type Session = {
  email: string;
  loggedIn: boolean;
  token: string;
  tokenValid: boolean;
  tokenExpired: boolean;
}
const initialState: Session = {
  email: "",
  token: "",
  loggedIn: false,
  tokenValid: false,
  tokenExpired: false,
}
type decodedToken = {
  username: string;
  exp: number;
}
export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<Session>) => {
      state.email = action.payload.email
      state.token = action.payload.token
      try {
        const decoded: decodedToken = jwt_decode(state.token)
        if (state.email == decoded.username) {
          state.tokenValid = true
          state.loggedIn = true
        } else {
          state.loggedIn = false
          state.tokenValid = false
        }
        if (state.tokenValid && !state.tokenExpired) {
          state.loggedIn = true
        }
      } catch (e) {
        state.loggedIn = false
        state.tokenValid = false
      }
    }
  }
})

export const { login } = sessionSlice.actions
export default sessionSlice.reducer
