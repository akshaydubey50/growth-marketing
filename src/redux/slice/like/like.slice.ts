import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface ItemId {
  itemId: string;
  likeCount: number;
}

interface Like {
  isAuthenticated: boolean;
  itemIds: ItemId[];
  itemType: "tools" | "prompts";
}

interface LikeState {
  isLikedChecked: boolean;
  likedList: Like[];
  status: "idle" | "loading" | "succeeded" | "failed";
  getLikeListStatus: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: LikeState = {
  isLikedChecked: false,
  likedList: [],
  status: "idle",
  getLikeListStatus: "idle",
  error: null,
};

export const getLikeList = createAsyncThunk<Like[]>(
  "like/fetchLikeList",
  async () => {
    const response = await fetch("/api/like");
    if (!response.ok) {
      throw new Error("Failed to fetch likes");
    }
    const jsonData = await response.json();
    console.log("likes from api ==> ", jsonData);
    return jsonData.likes as Like[];
  }
);

interface AddLikePayload {
  itemId: string;
  itemType: "tools" | "prompts";
}

interface AddLikeResponse {
  success: boolean;
  msg: string;
  like: {
    itemId: string;
    itemType: "tools" | "prompts";
  };
}

export const addLike = createAsyncThunk<
  Like, // Return type
  AddLikePayload, // Argument type
  { rejectValue: string }
>("like/addLike", async ({ itemId, itemType }, { dispatch }) => {
  const response = await fetch(`/api/like`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ itemId, itemType }),
  });

  if (!response.ok) {
    throw new Error("Failed to add like");
  }

  const data: AddLikeResponse = await response.json();

  // Re-fetch the like list after adding a like
  await dispatch(getLikeList());

  // Return properly formatted Like object
  return {
    isAuthenticated: true,
    itemType,
    itemIds: [{ itemId, likeCount: 1 }]
  };
});

export const deleteLike = createAsyncThunk<
  { itemId: string; itemType: "tools" | "prompts" },
  { itemId: string; itemType: "tools" | "prompts" }
>("like/deleteLike", async ({ itemId, itemType }, { dispatch }) => {
  const response = await fetch(`/api/like`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ itemId, itemType }),
  });
  
  if (!response.ok) {
    throw new Error("Failed to delete like");
  }
  
  await dispatch(getLikeList());
  return { itemId, itemType };
});

const likeSlice = createSlice({
  name: "like",
  initialState,
  reducers: {
    setIsLikedChecked: (state) => {
      state.isLikedChecked = !state.isLikedChecked;
    },
    clearLikedList: (state) => {
      state.likedList = [];
    },
    updateLikeList: (state, action: PayloadAction<Like[]>) => {
      state.likedList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLikeList.pending, (state) => {
        state.getLikeListStatus = "loading";
      })
      .addCase(getLikeList.fulfilled, (state, action: PayloadAction<Like[]>) => {
        state.getLikeListStatus = "succeeded";
        state.likedList = action.payload;
      })
      .addCase(getLikeList.rejected, (state, action) => {
        state.getLikeListStatus = "failed";
        state.error = action.error.message || null;
      })
      .addCase(addLike.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addLike.fulfilled, (state, action: PayloadAction<Like>) => {
        state.status = "succeeded";
        const existingLike = state.likedList.find(
          (like) => like.itemType === action.payload.itemType
        );

        if (existingLike) {
          existingLike.itemIds.push(action.payload.itemIds[0]);
        } else {
          state.likedList.push(action.payload);
        }
      })
      .addCase(addLike.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(deleteLike.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        deleteLike.fulfilled,
        (state, action: PayloadAction<{ itemId: string; itemType: string }>) => {
          state.status = "succeeded";
          const existingLiked = state.likedList.find(
            (like) => like.itemType === action.payload.itemType
          );
          if (existingLiked) {
            existingLiked.itemIds = existingLiked.itemIds.filter(
              (item) => item.itemId !== action.payload.itemId
            );
          }
        }
      )
      .addCase(deleteLike.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});

export const { setIsLikedChecked, clearLikedList, updateLikeList } = likeSlice.actions;
export default likeSlice.reducer;