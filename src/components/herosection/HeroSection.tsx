"use client";
import React, { useEffect, useState } from "react";
import { AirtableModel } from "@/models/airtable.model";
import { RiStackFill, RiSearchLine } from "react-icons/ri";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { VscVerifiedFilled, VscVerified } from "react-icons/vsc";
import { GoHeartFill } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import {
  clearBookmarkList,
  getBookmarkList,
} from "@/redux/slice/bookmark/bookmark.slice";
import { fetchProductList } from "@/redux/slice/product/product.slice";
import { AppDispatch, RootState } from "@/redux/store";
import {
  clearProductVerifiedList,
  setIsVerifiedChecked,
  setProductVerifiedList,
} from "@/redux/slice/verified/verified.slice";
import { setIsBookmarkCheck } from "@/redux/slice/bookmark/bookmark.slice";
import LikedBookmarkModal from "../modal/LikedBookmarkModal";
import {
  setSearchInputFocus,
  scrollPage,
} from "@/redux/slice/search/search.slice";
import { useSession } from "next-auth/react";

export default function HeroSection() {
  const dispatch: AppDispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [innerWidth, setInnerWidth] = useState(0);

  const { data: session } = useSession();

  const isBookmark = useSelector(
    (state: RootState) => state.bookmarks?.isBookmarkChecked || false
  );
  const isVerifiedCheck = useSelector(
    (store: RootState) => store.verifiedProducts?.isVerifiedChecked || false
  );
  const verifiedProductData = useSelector(
    (store: RootState) => store.verifiedProducts?.verifiedProductList || false
  );

  const { productList } = useSelector((state: RootState) => state.products);

  const handleShowAllProduct = () => {
    if (!productList) {
      dispatch(fetchProductList());
    }
    if (isVerifiedCheck) {
      dispatch(setIsVerifiedChecked());
      dispatch(clearProductVerifiedList());
    }
    if (isBookmark) {
      dispatch(setIsBookmarkCheck());
      dispatch(clearBookmarkList());
    }
  };

  const handleBookmark = async () => {
    if (!session) {
      return setIsOpen(true);
    } else {
      if (!isBookmark && session) {
        dispatch(setIsBookmarkCheck());
        dispatch(getBookmarkList());
      }
      if (isBookmark) {
        dispatch(setIsBookmarkCheck());
      }
      if (isVerifiedCheck) {
        dispatch(setIsVerifiedChecked());
      }
    }
  };

  const verifiedProductHandler = () => {
    const verifiedTool = productList?.filter(
      (item: AirtableModel) => item.fields.Verified
    );
    return verifiedTool;
  };

  const verifiedIconHandler = () => {
    if (isBookmark) {
      dispatch(setIsBookmarkCheck());
    }
    dispatch(setIsVerifiedChecked());
    if (verifiedProductData.length <= 0) {
      dispatch(setProductVerifiedList(verifiedProductHandler()));
    }
  };


  useEffect(() => {
    setInnerWidth(window.innerWidth);
  }, []);

  const searchIconHandler = () => {
    if(innerWidth < 768){
      dispatch(scrollPage(300));
    }
    else if(innerWidth < 1280){
      dispatch(scrollPage(400));
    }
    else{
      dispatch(scrollPage(600));
    }
    dispatch(setSearchInputFocus());
  };  
  return (
    <main className=" bg-light-gray ">
      <section className="flex flex-col py-12 
      px-4 space-y-10 place-items-center xl:space-y-14  max-w-screen-2xl mx-auto">
        <div>
          <div className="flex flex-col space-y-4 text-center">
            <p>
              <span className="px-4 py-1 font-semibold bg-white border border-green-500 border-solid rounded-full text-DarkOrange">
                200+ Growth Marketing Tools
              </span>
            </p>
            <h1 className="mx-auto text-2xl font-semibold leading-9 md:text-4xl md:leading-45 md:max-w-2xl xl:text-5xl xl:max-w-4xl xl:leading-tight">
              <span> Discover 200+ Growth Marketing Tools  </span>
              <span>for Marketers.</span>
            </h1>
            <div className="max-w-lg px-2 mx-auto text-base text-center md:text-base xl:text-2xl xl:max-w-4xl xl:leading-normal">
             Directory of 200+ growth marketing tools designed to accelerate growth and amplify results
            </div>
          </div>
        </div>
              <div className="flex space-x-4 md:space-x-6 lg:space-x-8 xl:space-x-12">
                <div className="flex flex-col space-y-4 cursor-pointer place-items-center">
                  <button
                    className={`text-tags bg-opacity-50 rounded-full p-3 xl:p-6  "bg-gray-200" : "bg-gray-300"
                     hover:bg-opacity-75 focus:outline-none`}
                    onClick={handleShowAllProduct}
                  >
                    <RiStackFill className="text-2xl text-black md:text-3xl lg:text-4xl" />
                  </button>
                  <p className="font-medium text-Title-Small xl:text-Title-Medium">
                    All Tools
                  </p>
                </div>
                <div className="flex flex-col space-y-4 cursor-pointer place-items-center">
                  <button
                    className={`text-tags bg-opacity-50 rounded-full p-3 xl:p-6 
                        "bg-gray-200"  "bg-gray-300"
                    } hover:bg-opacity-75 focus:outline-none`}
                    onClick={handleBookmark}
                  >
                    {isBookmark ? (
                      <BsBookmarkFill className="text-2xl text-black md:text-3xl lg:text-4xl" />
                    ) : (
                      <BsBookmark className="text-2xl text-black md:text-3xl lg:text-4xl" />
                    )}
                  </button>
                  <p className="font-medium text-Title-Small xl:text-Title-Medium">
                    Bookmark
                  </p>
                  {!session && isOpen && (
                    <LikedBookmarkModal isOpen={isOpen} setIsOpen={setIsOpen} />
                  )}
                </div>
                <div className="flex flex-col space-y-4 cursor-pointer place-items-center">
                  <button
                    className={`text-tags bg-opacity-50 rounded-full p-3 xl:p-6 
                    "bg-gray-200" : "bg-gray-300"
                     hover:bg-opacity-75 focus:outline-none`}
                    onClick={verifiedIconHandler}
                  >
                    {isVerifiedCheck ? (
                      <VscVerifiedFilled className="text-2xl text-black md:text-3xl lg:text-4xl" />
                    ) : (
                      <VscVerified className="text-2xl text-black md:text-3xl lg:text-4xl" />
                    )}
                  </button>
                  <p className="font-medium text-Title-Small xl:text-Title-Medium">
                    Verified
                  </p>
                </div>

                <div className="flex flex-col space-y-4 cursor-pointer place-items-center">
                  <button
                    className={`text-tags bg-opacity-50 rounded-full p-3 xl:p-6  "bg-gray-200" : "bg-gray-300"
                    hover:bg-opacity-75 focus:outline-none`}
                    onClick={searchIconHandler}
                  >
                    {" "}
                    <RiSearchLine className="text-2xl text-black md:text-3xl lg:text-4xl" />
                  </button>
                  <p className="font-medium text-Title-Small xl:text-Title-Medium">
                    Search
                  </p>
                </div>
              </div>
      </section>
    </main>
  );
}
