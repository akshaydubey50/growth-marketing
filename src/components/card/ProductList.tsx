"use client";
import React, { useEffect, useCallback } from "react";
import { useSearchParams, useParams, usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductList } from "@/redux/slice/product/product.slice";
import { getBookmarkList } from "@/redux/slice/bookmark/bookmark.slice";
import { RootState, AppDispatch } from "@/redux/store";
import { useSession } from "next-auth/react";
import { ProductCard } from "./ProductCard";
import Loader from "../common/Loader/Loader";
import Pagination from "../pagination/Pagination";
import { usePagination } from "@/hooks/usePagination";
import { usePaginatedFilteredProducts } from "@/hooks/useFilteredProduct";
import { isProductBookmarked } from "@/helper/helper";
import { getLikeList } from "@/redux/slice/like/like.slice";

interface ProductListProps {
  currentCategory?: string;
  itemsCount: number
}

export default function ProductList({ currentCategory, itemsCount=12 }: ProductListProps) {
  const id = useSearchParams().get("id");
  const params = useParams();
  const homePath = usePathname();

  const dispatch: AppDispatch = useDispatch();
  const { data: session } = useSession();
  const { productList, isLoading } = useSelector(
    (state: RootState) => state.products
  );
  const bookmarkList = useSelector(
    (state: RootState) => state.bookmarks.bookmarkList
  );
  const upVotedList = useSelector((state: RootState) => state.likes.likedList);
  console.log("upVotedList::::::::::", upVotedList)

  const isBookmark = useSelector(
    (state: RootState) => state.bookmarks.isBookmarkChecked || false
  );
  const productSearchQuery = useSelector(
    (state: RootState) => state.searchs.searchQuery
  );

  const {
    currentPage,
    currentProducts,
    handlePageChange,
    totalProducts,
    filteredProducts,
  } = usePaginatedFilteredProducts(itemsCount, {
    currentCategory,
    productList,
    dropDownCategoryArr: useSelector(
      (state: RootState) => state.categories.matchedCategory
    ),
    id,
    productSearchQuery,
    inputSearchFilterArr: useSelector(
      (state: RootState) => state.searchs.searchFilterList
    ),
    matchedPrice: useSelector(
      (state: RootState) => state.pricingModels.matchedPrice
    ),
    session,
    isBookmark,
    bookmarkList: bookmarkList.filter((item: any) => item.itemType == "tools"),
    isVerifiedCheck: useSelector(
      (state: RootState) => state.verifiedProducts.isVerifiedChecked
    ),
    verifiedProductArr: useSelector(
      (state: RootState) => state.verifiedProducts.verifiedProductList
    ),
    upVotedList,
    getProductByCategory: useCallback(
      (categoryType: string) =>
        productList?.filter((item) => item?.fields?.Tags[0] === categoryType),
      [productList]
    ),
  });

  useEffect(() => {
    if (productList?.length === 0) {
      dispatch(fetchProductList());
    }
  }, []);

  useEffect(() => {
    dispatch(getLikeList());
    if (session?.user) {
     
      dispatch(getBookmarkList());
    }
  }, [dispatch, session]);

  if (isLoading) {
    return <Loader />;
  }

  if (
    isBookmark &&
    (bookmarkList.filter((item: any) => item.itemType == "tools")?.length ===
      0 ||
      bookmarkList?.length === 0)
  ) {
    return (
      <div className="flex items-center justify-center text-3xl font-bold text-center h-80">
        <h2>No Bookmark yet</h2>
      </div>
    );
  }

  return (
    <>
      <main className="grid grid-cols-1 px-4 py-5 mx-auto gap-y-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-10 w-fit md:px-8 2xl:px-0 justify-items-center">
        {currentProducts?.map((item) => {
          return (
            <ProductCard
              key={item.id}
              product={item}
              isBookmark={isProductBookmarked(item, bookmarkList)}
              totalLikes={item?.totalLikes}
            />
          );
        })}
      </main>
      {productSearchQuery?.length > 0 && totalProducts == 0 && (
        <>
          <h1 className="text-3xl text-center">
            No Search
            <span className="font-bold">
              {" "}
              &quot;{productSearchQuery}&quot;{" "}
            </span>
            found
          </h1>
        </>
      )}
      <div className={`${homePath === "/" ? "hidden" : "block"}`}>
        {totalProducts > itemsCount && (
          <Pagination
            itemsCount={itemsCount}
            currentPage={currentPage}
            totalItems={totalProducts}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </>
  );
}
