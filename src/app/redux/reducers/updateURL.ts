
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export type UpdateMessage = {
  message: string;
}
export type UpdateURL = {
  loading: boolean
  updated: boolean;
  data: UpdateMessage,
  error: boolean;
  errorMessage: string;
}

const initialState: UpdateURL = {
  loading: false,
  data: {
    message: ""
  },
  updated: false,
  error: false,
  errorMessage: "",
}

const token = localStorage.getItem("authtoken_np")
//@ts-ignore
export const updateURL = createAsyncThunk<UpdateMessage>("update/url", async (data: any, { rejectWithValue }) => {
  try {
    console.log("inside ", data)
    const payload = {
      alias: data.alias,
      url: data.url
    }
    const response = await axios.patch(`http://localhost:9000/v1/alias/${data.current_alias}`, JSON.stringify(payload), {
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

const updateSlice = createSlice({
  name: "update",
  initialState,
  reducers: {
    resetUpdateURL: (state) => {
      state.updated = false
      state.data.message = ""
      state.loading = false
      state.error = false
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateURL.pending, (state) => {
        state.loading = true;

      })
      .addCase(updateURL.fulfilled, (state, action: PayloadAction<UpdateMessage>) => {
        state.data.message = action.payload.message
        state.loading = false;
        state.updated = true;
      })
      .addCase(updateURL.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.updated = false
        //@ts-ignore
        state.errorMessage = action.payload
      })
  }
})
export const { resetUpdateURL } = updateSlice.actions
export default updateSlice.reducer
