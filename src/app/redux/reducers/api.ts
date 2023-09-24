import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export type APIResponse = {
  original_url: string;
  shortened_url: string;
  clicks: string;
  alias: string;
}
export type GetAll = {
  loading: boolean
  data: APIResponse[]
  error: boolean;
  errorMessage: string;
}

const initialState: GetAll = {
  loading: true,
  data: [
    {
      original_url: "",
      shortened_url: "",
      clicks: "",
      alias: ""
    }
  ],
  error: false,
  errorMessage: "",
}
export const getAll = createAsyncThunk<APIResponse[]>("url/all", async () => {
  const response = await axios.get("http://localhost:9000/v1/master")
  return response.data
});

const apiSlice = createSlice({
  name: "all",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAll.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAll.fulfilled, (state, action: PayloadAction<APIResponse[]>) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(getAll.rejected, (state) => {
        state.loading = false;
        state.error = true;
        state.errorMessage = "Error";
      })

  }
})


export default apiSlice.reducer
