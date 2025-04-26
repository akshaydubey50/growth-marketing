import { useEffect, useMemo } from "react";
import { AirtableModel } from "@/models/airtable.model";
import { usePagination } from "./usePagination";

 function useFilteredProducts({
  currentCategory,
  productList,
  dropDownCategoryArr,
  id,
  productSearchQuery,
  inputSearchFilterArr,
  matchedPrice,
  session,
  isBookmark,
  bookmarkList,
  isVerifiedCheck,
  verifiedProductArr,
  upVotedList,
  getProductByCategory,
}: any) {
  return useMemo(() => {
    let shouldResetPage = false;
    let products: AirtableModel[] = [];

    const toolUpvotes = upVotedList?.find((list:any) => list.itemType === "tools")?.itemIds || [];


    if (currentCategory) {
      products = getProductByCategory(currentCategory) || [];
      shouldResetPage = true;

    } else if (dropDownCategoryArr?.length > 0 && !id) {
      products = dropDownCategoryArr;
      shouldResetPage = true;

    } else if (productSearchQuery.length > 0 && inputSearchFilterArr) {
      products = inputSearchFilterArr.length > 0 ? inputSearchFilterArr : [];
      shouldResetPage = true;

    } else if (matchedPrice.length > 0 && !id) {
      products = matchedPrice;
      shouldResetPage = true;

    } else if (session && isBookmark && bookmarkList) {
      /*  if (
        !Array.isArray(bookmarkList[0]?.itemIds) ||
        !Array.isArray(productList)
      ) {
        console.error("Either bookmarkList or productList is not an array");
        return [];
      } */

      /*   if (bookmarkList[0]?.itemIds?.length == 0) {
        console.log("bookmarkList[0]?.itemIds?.length", bookmarkList?.length);
        return [];
      } */
      shouldResetPage = true;

      products = productList?.filter((item: AirtableModel) =>
        bookmarkList[0]?.itemIds?.includes(item?.id)
      );
    } else if (isVerifiedCheck && verifiedProductArr?.length > 0) {
      shouldResetPage = true;

      products = verifiedProductArr;
    } else if (productList && !id) {
      products = productList;
    }

    const productsWithUpvotes = products?.map((product) => {
      const upvoteInfo = toolUpvotes?.find((item:any) => item.itemId === product.id);
      return {
        ...product,
        totalLikes: upvoteInfo?.likeCount || 0,
        isLiked: !!upvoteInfo
      };
    });
    console.log("productsWithUpvotes::::::::::",productsWithUpvotes)

    return {filteredProducts:productsWithUpvotes?.sort((a, b) => b.totalLikes - a.totalLikes),
      shouldResetPage

    }
  }, [
    currentCategory,
    dropDownCategoryArr,
    id,
    productSearchQuery,
    inputSearchFilterArr,
    matchedPrice,
    session,
    isBookmark,
    bookmarkList,
    isVerifiedCheck,
    verifiedProductArr,
    productList,
    getProductByCategory,
    upVotedList,
  ]);
}


// Create a new hook to combine usePagination and useFilteredProducts
export function usePaginatedFilteredProducts(itemsPerPage: number, filterProps: any) {
  const { currentPage, updateCurrentProducts, handlePageChange, setCurrentPage } = usePagination(itemsPerPage);
  const { filteredProducts, shouldResetPage } = useFilteredProducts(filterProps);
  useEffect(() => {
    if (shouldResetPage) {
      setCurrentPage(1);
    }
  }, [shouldResetPage, setCurrentPage]);

  const currentProducts = updateCurrentProducts(filteredProducts);

  return { currentPage, currentProducts, handlePageChange, totalProducts: filteredProducts?.length, filteredProducts }; 
}