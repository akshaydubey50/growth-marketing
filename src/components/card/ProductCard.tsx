"use client";
// React Component Import
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Icon's Import
import { MdVerified } from "react-icons/md";

// Project Component Import
import VisitWebsite from "../visit-website/VisitWebsite";
import { HomePage } from "@/constants/RoutePath";
import LikeButton from "../ui/likebutton";
import BookmarkButton from "../ui/bookmarkbutton";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { useAuthState } from "@/hooks/useAuth";

export function ProductCard(props: any) {
  const { upVotedList, bookmarkList, product, totalLikes } = props;
  const { id, fields } = product;

  const { Name, WebsiteLink, Description, ToolImage, Verified, Tags } =
    fields!;
  const formattedTitle = Name?.toLowerCase()?.trim()?.replace(/\s/g, "-");

  const likedList = useSelector((state: RootState) => state.likes.likedList);
  const bookmarkedList = useSelector(
    (state: RootState) => state.bookmarks.bookmarkList
  );

  const { isAuthenticated } = useAuthState();

  const [isAlreadyLiked, setIsAlreadyLiked] = useState(false);
  const [isAlreadyBookmarked, setIsAlreadyBookmarked] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      setIsAlreadyLiked(false);
      return;
    }

    // Find the tool in the likedList and check its isLiked property
    const toolLikedItem = likedList?.find((item) => item.itemType === "tools");
    if (toolLikedItem?.itemIds) {
      const likedItem : any = toolLikedItem.itemIds.find(
        (item) => item.itemId === id
      );
      console.log("likedItem::::",likedItem)
      setIsAlreadyLiked(likedItem?.isLiked || false);
    } else {
      setIsAlreadyLiked(false);
    }
  }, [id, likedList, isAuthenticated]);

  // New effect for bookmarks
  useEffect(() => {
    if (bookmarkedList?.length > 0 || bookmarkedList?.length != null) {
      const toolBookmarkedItem = bookmarkedList.find(
        (item) => item.itemType === "tools"
      );
      if (toolBookmarkedItem?.itemIds != null) {
        // Check if the current id is in the itemIds array
        setIsAlreadyBookmarked(toolBookmarkedItem.itemIds.includes(id));
      } else {
        setIsAlreadyBookmarked(false);
      }
    } else {
      setIsAlreadyBookmarked(false);
    }
  }, [id, bookmarkedList]);


  return (
    <div className="flex flex-col max-w-sm border border-black border-solid shadow-lg rounded-2xl">
      <Link href={`${HomePage}/${formattedTitle}`}>
        <section className="border-b border-black border-solid">
          <Image
            src={ToolImage}
            alt={`${formattedTitle}_banner`}
            loading="lazy"
            width="1280"
            height="720"
            decoding="async"
            data-nimg="1"
            className="object-cover w-full rounded-t-2xl"
          />
        </section>
      </Link>
      <section className="h-full px-5 bg-light-gray pt-7 rounded-b-2xl">
        <div className="flex flex-col justify-between h-full">
          <div>
            <div className="flex flex-row justify-between flex-1 pb-4">
              <div className="flex items-center gap-x-2">
                <h2 className="h-8 font-bold text-Title-Medium md:text-Title-Large">
                  {Name}
                </h2>
                {Verified && (
                  <MdVerified className="text-2xl text-DarkOrange" />
                )}
              </div>

              <LikeButton
                key={`${{ id }}+${{ Name }}`}
                itemId={id}
                itemName={Name}
                initialLikedState={isAlreadyLiked}
                itemType="tools"
              />
            
            </div>
          </div>
          <div>
            <div className="h-16 text-Description">
              <p className="line-clamp-3">{Description}</p>
            </div>
          </div>
          <div className="tool-btn-section pb-7">
            <p className="my-6">
              <span className="px-5 py-1 font-medium bg-white border border-black border-solid rounded-full text-tags">
                {Tags}
              </span>
            </p>
            <div className="flex items-center justify-between text-white text-Title-Medium">
              <VisitWebsite btnText="Visit Website" url={WebsiteLink} />
              <BookmarkButton
                id={id}
                Name={Name}
                isInitialBookmarked={isAlreadyBookmarked}
                itemType="tools"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
