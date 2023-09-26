import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export type APIResponse = {
  [key: string]: number;
}
export type GetByCountry = {
  loading: boolean
  data: APIResponse;
  error: boolean;
  dataLoaded: boolean;
  errorMessage: string;
}

const initialState: GetByCountry = {
  loading: false,
  data: {
    "NP": 1
  },
  error: false,
  dataLoaded: false,
  errorMessage: "",
}

const token = localStorage.getItem("authtoken_np")
//@ts-ignore
export const getCountryByAlias = createAsyncThunk<APIResponse>("country/alias", async (data: any, { rejectWithValue }) => {
  try {

    const response = await axios.get(`http://localhost:9000/v1/count/country/${data}`, {
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


const getByCountrySlice = createSlice({
  name: "countryalias",
  initialState,
  reducers: {
    resetGetByCountryState: (state) => {
      state.errorMessage = ""
      state.error = false
      state.loading = false
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCountryByAlias.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getCountryByAlias.fulfilled, (state, action: PayloadAction<APIResponse>) => {
        state.data = action.payload;
        state.loading = false;
        state.error = false;
        state.dataLoaded = true
      })
      .addCase(getCountryByAlias.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        //@ts-ignore
        state.errorMessage = action.payload ?? "Something went wrong"
        state.dataLoaded = false
      })

  }
})

export const { resetGetByCountryState } = getByCountrySlice.actions
export default getByCountrySlice.reducer
