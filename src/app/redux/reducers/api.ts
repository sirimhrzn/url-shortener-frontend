import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { X509Certificate } from "crypto";


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
//@ts-ignore
export const getAll = createAsyncThunk<APIResponse[]>("url/all", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.get(`http://localhost:9000/v1/master?limit=${data.limit}&page=${data.page}`)
    return response.data
  } catch (e) {
    return rejectWithValue(e.response.data.message)
  }
});

const apiSlice = createSlice({
  name: "all",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAll.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getAll.fulfilled, (state, action: PayloadAction<APIResponse[]>) => {
        state.data = action.payload;
        state.loading = false;
        state.error = false;
      })
      .addCase(getAll.rejected, (state) => {
        state.loading = false;
        state.error = true;
        state.errorMessage = "Error";
      })

  }
})


export default apiSlice.reducer
