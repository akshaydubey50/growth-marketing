import { ProjectModel } from "@/models/airtable.model";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface ProjectsState {
    isLoading: boolean;
    error: string | null;
    projectList: ProjectModel[];
    filter: {
        groupFilter: ProjectModel[];
    };
    searchQuery: string;
    selectedCategory: string;
    selectedProjectType: string;
}

const initialState: ProjectsState = {
    isLoading: false,
    error: null,
    projectList: [],
    filter: {
        groupFilter: [],
    },
    searchQuery: "",
    selectedCategory: "all", // Default value as "all"
    selectedProjectType: "all", // Default value as "all"
};

// Async thunk to fetch project data
export const fetchProjectsList = createAsyncThunk<ProjectModel[], void>(
    "fetch/projectList",
    async () => {
        try {
            const response = await fetch("/api/projects");
            const responseBody = await response?.json();
            return responseBody.data; // Assuming the API returns an object with 'data' as an array
        } catch (error) {
            return []; // Fallback in case of an error
        }
    }
);

const projectsSlice = createSlice({
    name: "projectList",
    initialState,
    reducers: {
        // Set the filtered project list
        setGroupFilter: (state, action: PayloadAction<{ groupFilter: ProjectModel[] }>) => {
            state.filter.groupFilter = action.payload.groupFilter;
        },

        // Set the search query
        setSearchQuery: (state, action: PayloadAction<{ searchQuery: string }>) => {
            state.searchQuery = action.payload.searchQuery;
        },

        // Set the selected category for filtering
        setSelectedCategory: (state, action: PayloadAction<{ selectedCategory: string }>) => {
            state.selectedCategory = action.payload.selectedCategory;
        },

        // Set the selected project type for filtering
        setSelectedProjectType: (state, action: PayloadAction<{ selectedProjectType: string }>) => {
            state.selectedProjectType = action.payload.selectedProjectType;
        },

        // Optional: Reset the filters (if you ever need to reset them)
        resetFilters: (state) => {
            state.selectedCategory = "all";
            state.selectedProjectType = "all";
            state.searchQuery = "";
            state.filter.groupFilter = state.projectList; // Reset the filter to the full project list
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProjectsList.fulfilled, (state, action) => {
                state.isLoading = false;
                state.projectList = action.payload;
                state.filter.groupFilter = action.payload; // Initialize with all projects
            })
            .addCase(fetchProjectsList.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchProjectsList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message ?? "Something went wrong"; // Improve error handling
            });
    },
});

// Exporting actions
export const { setGroupFilter, setSearchQuery, setSelectedProjectType, setSelectedCategory, resetFilters } = projectsSlice.actions;
export default projectsSlice.reducer;
