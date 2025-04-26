import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// Define types for bookmark items and state
export interface BookmarkItem {
  itemType: "tools" | "prompts"; // Include itemType
  itemIds: string[]; // An array of itemIds
}

interface BookmarkState {
  isBookmarkChecked: boolean; // Reintroduced state
  bookmarkList: BookmarkItem[]; // Array of BookmarkItem
  status: "idle" | "loading" | "succeeded" | "failed";
  getListStatus: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Async thunk to fetch the bookmark list
export const getBookmarkList = createAsyncThunk<BookmarkItem[]>(
  "bookmark/fetchBookmarkList",
  async () => {
    const response = await fetch("/api/bookmark");
    const jsonData = await response.json();

    // Adjust this to map the response properly
    return (
      jsonData?.bookmarks.map(
        (bookmark: { itemType: string | null; itemIds: string[] }) => ({
          itemType: bookmark.itemType,
          itemIds: bookmark.itemIds,
        })
      ) || []
    ); // Default to an empty array if no bookmarks are found
  }
);

// Async thunk to add a bookmark
export const addBookmark = createAsyncThunk<
  BookmarkItem,
  { itemId: string; itemType: "tools" | "prompts" }
>("bookmark/addBookmark", async ({ itemId, itemType }, { dispatch }) => {
  const response = await fetch("/api/bookmark", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ itemId, itemType }),
  });
  console.log("data", response);

  if (!response.ok) {
    throw new Error( "Failed to add bookmark");
  }

  dispatch(getBookmarkList());
  
  return { itemType, itemIds: [itemId] }; // Adjust return value to match the structure
});

// Async thunk to delete a bookmark
export const deleteBookmark = createAsyncThunk<
  { itemId: string; itemType: string },
  { itemId: string; itemType: string }
>("bookmark/deleteBookmark", async ({ itemId, itemType }, { dispatch }) => {
  const response = await fetch("/api/bookmark", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ itemId, itemType }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.msg || "Failed to delete bookmark");
  }

  dispatch(getBookmarkList());
  return { itemId, itemType };
});

// Initial state
const initialState: BookmarkState = {
  isBookmarkChecked: false, // Reintroduced state
  bookmarkList: [],
  status: "idle",
  getListStatus: "idle",
  error: null,
};

// Create the slice
const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState,
  reducers: {
    setIsBookmarkCheck: (state) => {
      state.isBookmarkChecked = !state.isBookmarkChecked; // Toggle the state
    },
    clearBookmarkList: (state) => {
      state.bookmarkList = [];
    },
    updateBookmarkList(state, action: PayloadAction<BookmarkItem[]>) {
      state.bookmarkList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBookmarkList.pending, (state) => {
        state.getListStatus = "loading";
      })
      .addCase(
        getBookmarkList.fulfilled,
        (state, action: PayloadAction<BookmarkItem[]>) => {
          state.getListStatus = "succeeded";
          state.bookmarkList = action.payload;
        }
      )
      .addCase(getBookmarkList.rejected, (state, action) => {
        state.getListStatus = "failed";
        state.error = action.error.message || null;
      })
      .addCase(addBookmark.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        addBookmark.fulfilled,
        (state, action: PayloadAction<BookmarkItem>) => {
          state.status = "succeeded";
          // Handle addition logic according to the new structure
          const existingBookmark = state.bookmarkList.find(
            (bookmark) => bookmark.itemType === action.payload.itemType
          );
          if (existingBookmark) {
            existingBookmark.itemIds.push(action.payload.itemIds[0]);
          } else {
            state.bookmarkList.push(action.payload);
          }
        }
      )
      .addCase(addBookmark.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(deleteBookmark.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        deleteBookmark.fulfilled,
        (
          state,
          action: PayloadAction<{ itemId: string; itemType: string }>
        ) => {
          state.status = "succeeded";
          const existingBookmark = state.bookmarkList.find(
            (bookmark) => bookmark.itemType === action.payload.itemType
          );
          if (existingBookmark) {
            existingBookmark.itemIds = existingBookmark.itemIds.filter(
              (id) => id !== action.payload.itemId
            );
          }
        }
      )
      .addCase(deleteBookmark.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});

// Export actions and reducer
export const { setIsBookmarkCheck, clearBookmarkList, updateBookmarkList } =
  bookmarkSlice.actions;
export default bookmarkSlice.reducer;
