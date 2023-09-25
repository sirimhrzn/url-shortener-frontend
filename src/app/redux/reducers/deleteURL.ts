
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export type DeleteMessage = {
  message: string;
}
export type DeleteURL = {
  loading: boolean
  deleted: boolean;
  data: DeleteMessage
  error: boolean;
  errorMessage: string;
}
const initialState: DeleteURL = {
  loading: false,
  data: {
    message: ""
  },
  deleted: false,
  error: false,
  errorMessage: "",
}

const token = localStorage.getItem("authtoken_np")
export const deleteURL = createAsyncThunk<DeleteMessage>("delete/url", async (alias: any, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`http://localhost:9000/v1/alias/${alias}`, {
      headers: {
        "Authorization": token,
        "Content-Type": "application/json"
      }
    })
    return response.data
  } catch (e) {
    //@ts-ignore
    return rejectWithValue(e.response.data.message)
  }

});

const deleteSlice = createSlice({
  name: "delete",
  initialState,
  reducers: {
    reset: (state) => {
      state.deleted = false
      state.data.message = ""
      state.loading = false
      state.error = false
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteURL.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteURL.fulfilled, (state, action: PayloadAction<DeleteMessage>) => {
        state.data.message = action.payload.message
        state.loading = false;
        state.deleted = true;
      })
      .addCase(deleteURL.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.deleted = false
        //@ts-ignore
        state.errorMessage = action.payload ?? "Something went wrong"
      })
  }
})
export const { reset } = deleteSlice.actions
export default deleteSlice.reducer
