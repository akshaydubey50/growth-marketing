import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the shape of the initial state
interface UserState {
  isUserAuthenticated: boolean;
}

// Define the initial state
const initialState: UserState = {
  isUserAuthenticated: false,
};

// Create the slice
export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setUserAuth: (state, action: PayloadAction<boolean>) => {
      state.isUserAuthenticated = action.payload;
    },
  },
});

// Export actions
export const { setUserAuth } = authSlice.actions;

// Export the reducer
export default authSlice.reducer;
