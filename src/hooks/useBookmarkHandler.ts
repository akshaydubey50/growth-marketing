// import { useState, useCallback } from "react";
// import { useDispatch } from "react-redux";
// import {
//   addBookmark,
//   deleteBookmark,
// } from "@/redux/slice/bookmark/bookmark.slice";
// import { useSession } from "next-auth/react";
// import { useToast } from "@/components/ui/use-toast";
// import { AppDispatch } from "@/redux/store";

// export function useBookmarkHandler(
//   id: string,
//   Name: string,
//   isInitialBookmarked: boolean,
//   itemType: "tools" | "prompts"
// ) {
//   const [isBookMarked, setIsBookMarked] = useState(isInitialBookmarked);
//   const { toast } = useToast();
//   const { data: session } = useSession();
//   const dispatch = useDispatch<AppDispatch>();

//   const handleBookmark = useCallback(() => {
//     if (!session || !session?.user) {
//       toast({
//         title: "Please log in to bookmark",
//         variant: "destructive",
//       });
//       return;
//     }

//     const updatedBookmarkState = !isBookMarked;
//     setIsBookMarked(updatedBookmarkState);

//     const bookmarkData = { itemId: id, itemType: itemType }; // Include itemType in the dispatch

//     if (updatedBookmarkState) {
//       toast({
//         title: `You bookmarked ${Name}`,
//         variant: "success",
//       });
//       dispatch(addBookmark(bookmarkData));
//     } else {
//       toast({
//         title: `You removed ${Name} from bookmarks`,
//         variant: "destructive",
//       });
//       dispatch(deleteBookmark(bookmarkData));
//     }
//   }, [session, isBookMarked, toast, Name, dispatch, id, itemType]);

//   return { isBookMarked, handleBookmark };
// }

import { useState, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  addBookmark,
  deleteBookmark,
} from "@/redux/slice/bookmark/bookmark.slice";
import { useSession } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import { AppDispatch } from "@/redux/store";

export function useBookmarkHandler(
  id: string,
  Name: string,
  isInitialBookmarked: boolean,
  itemType: "tools" | "prompts"
) {
  const [isBookMarked, setIsBookMarked] = useState(isInitialBookmarked);
  const { toast } = useToast();
  const { data: session } = useSession();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setIsBookMarked(isInitialBookmarked);
  }, [isInitialBookmarked]);

  const handleBookmark = useCallback(async () => {
    if (!session || !session?.user) {
      toast({
        title: "Please log in to bookmark",
        variant: "destructive",
      });
      return;
    }

    const newBookmarkState = !isBookMarked; // Capture the new state
    setIsBookMarked(newBookmarkState); // Update state immediately

    const bookmarkData = { itemId: id, itemType: itemType }; // Include itemType in the dispatch

    try {
      if (newBookmarkState) {
        await dispatch(addBookmark(bookmarkData)); // Dispatch to add bookmark
        console.log("Bookmark added successfully");
        toast({
          title: `You bookmarked ${Name}`,
          variant: "success",
        });
      } else {
        await dispatch(deleteBookmark(bookmarkData)); // Dispatch to remove bookmark
        toast({
          title: `You removed ${Name} from bookmarks`,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error bookmarking/unbookmarking the item:", error);
      // Revert the state back if there's an error
      setIsBookMarked(isBookMarked);
    }
  }, [session, toast, Name, dispatch, id, itemType, isBookMarked]);

  return { isBookMarked, handleBookmark };
}
