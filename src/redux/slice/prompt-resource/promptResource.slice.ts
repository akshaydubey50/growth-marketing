import { PropmtResourceModel } from "@/models/airtable.model";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Define the state interface
interface PromptResourceState {
  isLoading: boolean;
  isError: boolean;
  promptResourceList: PropmtResourceModel[];
}

const initialState: PromptResourceState = {
  isLoading: true,
  isError: false,
  promptResourceList: [],
};

export const fetchPromptResourceList = createAsyncThunk<
  PropmtResourceModel[],
  void
>("fetch/promptResourceList", async () => {
  const response = await fetch("/api/prompts");
  if (!response.ok) {
    throw new Error("Failed to fetch prompt resources");
  }
  const responseBody = await response.json();
  return responseBody.data;
});

const promptResourceSlice = createSlice({
  name: "promptResourceList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPromptResourceList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.promptResourceList = action.payload;
      })
      .addCase(fetchPromptResourceList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPromptResourceList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        console.error(action.error.message);
      });
  },
});

// Selector to get the prompt resource list
export const selectPromptResourceList = (state: {
  promptResourceList: PromptResourceState;
}) => state.promptResourceList.promptResourceList;

// Selector to get loading state
export const selectIsLoading = (state: {
  promptResourceList: PromptResourceState;
}) => state.promptResourceList.isLoading;

// Selector to get error state
export const selectIsError = (state: {
  promptResourceList: PromptResourceState;
}) => state.promptResourceList.isError;

// Export actions (if you have any in the reducers, otherwise this can be omitted)
export const {} = promptResourceSlice.actions;

// Export the reducer
export default promptResourceSlice.reducer;
