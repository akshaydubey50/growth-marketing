import { AirtableModel } from "@/models/airtable.model";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the shape of the initial state
interface SearchState {
  searchQuery: string;
  searchFilterList: AirtableModel[];
  searchToFocus: boolean;
  scrollPosition: number;
}

// Define the initial state
const initialState: SearchState = {
  searchQuery: "",
  searchFilterList: [],
  searchToFocus: false,
  scrollPosition: 0,
};

// Create the slice
const searchSlice = createSlice({
  name: "searchSlice",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSearchFilterList: (state, action: PayloadAction<any[]>) => {
      // Replace 'any' with your actual filter type
      state.searchFilterList = action.payload;
    },
    clearSearchFilterList: (state) => {
      state.searchFilterList.length = 0;
      state.searchQuery = "";
    },
    setSearchInputFocus: (state) => {
      state.searchToFocus = !state.searchToFocus;
    },
    scrollPage: (state, action: PayloadAction<number>) => {
      state.scrollPosition = action.payload;
    },
  },
});

// Export actions
export const {
  setSearchQuery,
  setSearchFilterList,
  clearSearchFilterList,
  setSearchInputFocus,
  scrollPage,
} = searchSlice.actions;

// Export the reducer
export default searchSlice.reducer;
