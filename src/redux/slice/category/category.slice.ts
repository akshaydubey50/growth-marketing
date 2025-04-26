import { AirtableModel } from "@/models/airtable.model";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the types for the state
interface CategoryState {
  matchedCategory: AirtableModel[]; // Assuming matchedCategory is an array of strings, adjust as needed
  categoryData: string | null; // Can be a string or null
}

// Initial state
const initialState: CategoryState = {
  matchedCategory: [],
  categoryData: null,
};

// Create the category slice
const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setMatchedCategory: (state, action: PayloadAction<AirtableModel[]>) => {
      // Set matched category data
      state.matchedCategory = action.payload;
    },
    setCategoryData: (state, action: PayloadAction<string>) => {
      // Set selected dropdown value
      state.categoryData = action.payload;
    },
    clearCategoryData: (state) => {
      // Clear selected dropdown value
      state.categoryData = null;
    },
    clearMatchedCategory: (state) => {
      // Clear matched category data
      state.matchedCategory = [];
    },
  },
});

// Export actions and reducer
export const {
  setMatchedCategory,
  setCategoryData,
  clearCategoryData,
  clearMatchedCategory,
} = categorySlice.actions;

export default categorySlice.reducer;
