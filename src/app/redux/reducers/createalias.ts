
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

export type Shortened = {
  shortened_url: string;
}
export type ShortenURL = {
  loading: boolean
  data: Shortened;
  error: boolean;
  errorMessage: string;
}
export type ShortenPayload = {
  url: string;
  alias: string;
}
const initialState: ShortenURL = {
  loading: true,
  data: {
    shortened_url: ""
  },
  error: false,
  errorMessage: "",
}
let message = "";

const token = localStorage.getItem("authtoken_np")
export const shortenURL = createAsyncThunk<Shortened>("url/shorten", async (data: any, { rejectWithValue }) => {
  try {
    console.log(data)
    const response = await axios.post("http://localhost:9000/v1", JSON.stringify(data), {
      headers: {
        "Authorization": token,

        "Content-Type": "application/json"
      }
    })
    return response.data
  } catch (e) {
    return rejectWithValue(e.response.data.message)
  }

});
const shortenSlice = createSlice({
  name: "shorten",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(shortenURL.pending, (state) => {
        state.loading = true;
      })
      .addCase(shortenURL.fulfilled, (state, action: PayloadAction<Shortened>) => {
        state.data.shortened_url = action.payload.shortened_url
        state.loading = false;
      })
      .addCase(shortenURL.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        //@ts-ignore
        state.errorMessage = action.payload
      })

  }
})

export default shortenSlice.reducer
