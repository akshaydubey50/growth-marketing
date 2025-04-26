import { ExpertModel } from "@/models/airtable.model";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { set } from "mongoose";

// Define the state interface

export interface ExpertsFilter {
    selectedSkills: string[];
    selectedLanguages: string[];
    selectedExpertTypes: string[];
    searchQuery: string;
    isVerified: boolean;
}
interface ExpertsState {
    isLoading: boolean;
    isError: boolean;
    expertsList: ExpertModel[];
    filter: ExpertsFilter;
}

const initialState: ExpertsState = {
    isLoading: true,
    isError: false,
    expertsList: [],
    filter: {
        selectedSkills: [],
        selectedLanguages: [],
        selectedExpertTypes: [],
        searchQuery: "",
        isVerified: false,
    },
};

export const fetchExpertsList = createAsyncThunk<
    ExpertModel[],
    void
>("fetch/expertsList", async () => {
    const response = await fetch("/api/experts");
    if (!response.ok) {
        throw new Error("Failed to fetch experts");
    }
    const responseBody = await response.json();
    return responseBody.data;
});

const expertsSlice = createSlice({
    name: "expertsList",
    initialState,
    reducers: {

        updateFilters: (state, action: PayloadAction<Partial<ExpertsFilter>>) => {
            state.filter = { ...state.filter, ...action.payload };
        },
        resetFilters: (state) => {
            state.filter = initialState.filter;
        }


    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchExpertsList.fulfilled, (state, action) => {
                state.isLoading = false;
                state.expertsList = action.payload;
            })
            .addCase(fetchExpertsList.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchExpertsList.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                console.error(action.error.message);
            });
    },
});



// Export actions (if you have any in the reducers, otherwise this can be omitted)
export const { updateFilters ,resetFilters} = expertsSlice.actions;

// Export the reducer
export default expertsSlice.reducer;
