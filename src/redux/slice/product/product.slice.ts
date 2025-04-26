import { AirtableModel } from "@/models/airtable.model";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface ProductState {
  isLoading: boolean;
  isError: boolean;
  productList: AirtableModel[];
}

const initialState: ProductState = {
  isLoading: true,
  isError: false,
  productList: [],
};

export const fetchProductList = createAsyncThunk<
  ProductState["productList"],
  void
>("fetch/toolList", async () => {
  const response = await fetch("/api/tools", { cache: "no-store" });
  if (!response.ok) {
    throw new Error("Failed to fetch product list");
  }
  const responseBody = await response.json();
  return responseBody.data;
});

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload;
      })
      .addCase(fetchProductList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProductList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true; // Change to true since it is a boolean
        console.error(action.error.message); // Optional: log the error message
      });
  },
});

// Export actions (if you have any in the reducers, otherwise this can be omitted)
export const {} = productSlice.actions;

// Export the reducer
export default productSlice.reducer;
