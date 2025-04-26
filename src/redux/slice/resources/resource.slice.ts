import { ResourceModel } from "@/models/airtable.model";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// Define the shape of the initial state

export interface ResourceFilter {
  selectedTopic: string;
}

interface ResourceState {
  isLoading: boolean;
  error: string | null;
  resourceList: ResourceModel[];
  filter: ResourceFilter;

}

// Define the initial state
const initialState: ResourceState = {
  isLoading: false,
  error: null,
  resourceList: [],
  filter:{
    selectedTopic: "All",
  }
};

// Async thunk to fetch data from the Airtable list
export const fetchResourcesList = createAsyncThunk<
  ResourceState["resourceList"],
  void
>("fetch/resourceList", async () => {
  const response = await fetch("/api/resources");
  const responseBody = await response.json();
  return responseBody.data;
});

// Create the slice
const resourceSlice = createSlice({
  name: "resourceList",
  initialState,
  reducers: {

    updateFilters: (state, action: PayloadAction<Partial<ResourceFilter>>) => {
      state.filter = { ...state.filter, ...action.payload };
    },
    resetFilters: (state) => {
      state.filter = initialState.filter;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchResourcesList.fulfilled,
      (state, action: PayloadAction<ResourceState["resourceList"]>) => {
        state.isLoading = false;
        state.resourceList = action.payload;
      }
    );
    builder.addCase(fetchResourcesList.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchResourcesList.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? "Something went wrong";
    });
  },
});

// Export the actions (if you have defined any in reducers)
export const { updateFilters, resetFilters } = resourceSlice.actions;

// Export the reducer
export default resourceSlice.reducer;
