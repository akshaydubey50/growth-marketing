import React from "react";
import { useBookmarkHandler } from "@/hooks/useBookmarkHandler";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";

interface BookmarkButtonProps {
  id: string;
  Name: string;
  isInitialBookmarked: boolean;
  itemType: "tools" | "prompts"; // Add itemType parameter
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({
  id,
  Name,
  isInitialBookmarked,
  itemType,
}) => {
  const { isBookMarked, handleBookmark } = useBookmarkHandler(
    id,
    Name,
    isInitialBookmarked,
    itemType
  );

  return (
    <>
      {" "}
      {/*  <button
        onClick={handleBookmark}
        aria-label={isBookMarked ? "Remove bookmark" : "Add bookmark"}
      >
        {isBookMarked ? "Unbookmark" : "Bookmark"}
      </button> */}
      <button title="Bookmark" type="button" onClick={handleBookmark}>
        {isBookMarked ? (
          <BsBookmarkFill className="text-3xl text-DarkOrange" />
        ) : (
          <BsBookmark className="text-3xl text-black" />
        )}
      </button>
    </>
  );
};

export default BookmarkButton;
