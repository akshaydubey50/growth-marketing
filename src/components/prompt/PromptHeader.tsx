import React, { useState, useCallback, useEffect } from "react";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { PropmtResourceModel } from "@/models/airtable.model";
import { Badge } from "../ui/badge";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import LikeButton from "../ui/likebutton";
import BookmarkButton from "../ui/bookmarkbutton";

interface PromptHeaderProps {
  promptData: PropmtResourceModel;
}

const PromptHeader: React.FC<PromptHeaderProps> = React.memo(
  ({ promptData }) => {
    const [isTextCopied, setIsTextCopied] = useState(false);
    const [isBookMarked, setIsBookMarked] = useState(false);
    const [isLiked, setIsLiked] = useState(false);

    const handleLike = useCallback(() => setIsLiked((prev) => !prev), []);
    const handleBookmark = useCallback(
      () => setIsBookMarked((prev) => !prev),
      []
    );

    const copyPrompt = useCallback(async () => {
      if (promptData.fields.Description) {
        await navigator.clipboard.writeText(promptData.fields.Description);
        setIsTextCopied(true);
        setTimeout(() => setIsTextCopied(false), 3000);
      }
    }, [promptData.fields.Description]);

    const likedPromptList = useSelector(
      (state: RootState) => state.likes.likedList
    );
    const bookmarkedPromptList = useSelector(
      (state: RootState) => state.bookmarks.bookmarkList
    );

    const [isAlreadyLiked, setIsAlreadyLiked] = useState(false);
    const [isAlreadyBookmarked, setIsAlreadyBookmarked] = useState(false);

    // New effect for Likes
    useEffect(() => {
      if (likedPromptList?.length > 0) {
        const toolLikedItem = likedPromptList.find(
          (item) => item?.itemType?.toLowerCase() === "prompts"
        );
        if (toolLikedItem?.itemIds != null) {
          // Check if the current id is in the itemIds array
          setIsAlreadyLiked(
            toolLikedItem.itemIds.some((item) => item.itemId === promptData?.id)
          );
        } else {
          setIsAlreadyLiked(false);
        }
      } else {
        setIsAlreadyLiked(false);
      }
    }, [promptData?.id, likedPromptList]);

    // New effect for bookmarks
    useEffect(() => {
      if (
        bookmarkedPromptList?.length > 0 ||
        bookmarkedPromptList?.length != null
      ) {
        const toolBookmarkedItem = bookmarkedPromptList.find(
          (item) => item?.itemType?.toLowerCase() === "prompts"
        );
        if (toolBookmarkedItem?.itemIds != null) {
          // Check if the current id is in the itemIds array
          setIsAlreadyBookmarked(
            toolBookmarkedItem.itemIds.includes(promptData?.id)
          );
        } else {
          setIsAlreadyBookmarked(false);
        }
      } else {
        setIsAlreadyBookmarked(false);
      }
    }, [promptData?.id, bookmarkedPromptList]);

    return (
      <CardHeader>
        <div className="flex flex-col space-y-4 md:flex-row md:items-start md:justify-between md:space-y-0">
          <CardTitle className="text-2xl md:text-3xl font-bold">
            {promptData.fields.Name}
          </CardTitle>
          <div className="flex flex-wrap items-center gap-2 md:gap-4">
            <LikeButton
              key={promptData?.id}
              initialLikedState={isAlreadyLiked}
              itemId={promptData?.id}
              itemName={promptData?.fields?.Name}
              itemType="prompts"
            />
            <BookmarkButton
              key={promptData?.id}
              isInitialBookmarked={isAlreadyBookmarked}
              Name={promptData?.fields?.Name}
              id={promptData?.id}
              itemType="prompts"
            />
            <Button
              onClick={copyPrompt}
              variant="outline"
              size="sm"
              className={`border-black ${isTextCopied ? "bg-DarkOrange text-white border-none" : ""}`}
            >
              {isTextCopied ? "Copied" : "Copy Prompt"}
            </Button>
          </div>
        </div>
      </CardHeader>
    );
  }
);

PromptHeader.displayName = "PromptHeader";

export default PromptHeader;
