import { AirtableModel } from "@/models/airtable.model";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the shape of the initial state
interface VerifiedProductState {
  verifiedProductList: AirtableModel[];
  isVerifiedChecked: boolean;
}

// Define the initial state
const initialState: VerifiedProductState = {
  verifiedProductList: [],
  isVerifiedChecked: false,
};

// Create the slice
const verifiedProductSlice = createSlice({
  name: "verifiedProductSlice",
  initialState,
  reducers: {
    setProductVerifiedList: (state, action: PayloadAction<any[]>) => {
      // Replace `any` with a specific type if available
      state.verifiedProductList = action.payload;
    },
    clearProductVerifiedList: (state) => {
      state.verifiedProductList.length = 0;
    },
    setIsVerifiedChecked: (state) => {
      state.isVerifiedChecked = !state.isVerifiedChecked;
    },
  },
});

// Export actions
export const {
  setProductVerifiedList,
  clearProductVerifiedList,
  setIsVerifiedChecked,
} = verifiedProductSlice.actions;

// Export the reducer
export default verifiedProductSlice.reducer;
