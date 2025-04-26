import { AirtableModel } from "@/models/airtable.model";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the types for the state
interface PriceModelState {
  matchedPrice: AirtableModel[]; // Assuming matchedPrice is an array of numbers, adjust as needed
  priceData: string | null; // Can be a string or null
}

// Initial state
const initialState: PriceModelState = {
  matchedPrice: [],
  priceData: null,
};

// Create the price model slice
const priceModelSlice = createSlice({
  name: "priceModel",
  initialState,
  reducers: {
    setMatchedPrice: (state, action: PayloadAction<AirtableModel[]>) => {
      // Set matched price data
      state.matchedPrice = action.payload;
    },
    setPriceData: (state, action: PayloadAction<string>) => {
      // Set selected dropdown value
      state.priceData = action.payload;
    },
    clearPriceData: (state) => {
      // Clear selected dropdown value
      state.priceData = null;
    },
    clearMatchedPrice: (state) => {
      // Clear matched price data
      state.matchedPrice = [];
    },
  },
});

// Export actions and reducer
export const {
  clearMatchedPrice,
  clearPriceData,
  setPriceData,
  setMatchedPrice,
} = priceModelSlice.actions;

export default priceModelSlice.reducer;
