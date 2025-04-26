"use client";
import { AirtableModel } from "@/models/airtable.model";
import React, { use, useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useVisibleItemContextData } from "@/lib/visibleItemContext";
import SelectDropdown from "./SelectDropdown";
import { useSelector, useDispatch } from "react-redux";
import {
  setCategoryData,
  clearCategoryData,
  clearMatchedCategory,
  setMatchedCategory,
} from "@/redux/slice/category/category.slice";
import {
  setSearchQuery,
  setSearchFilterList,
  clearSearchFilterList,
  scrollPage,
} from "@/redux/slice/search/search.slice";
import {
  clearMatchedPrice,
  clearPriceData,
  setMatchedPrice,
  setPriceData,
} from "@/redux/slice/priceModel/priceModel.slice";
import { RootState, AppDispatch } from "@/redux/store";
import { HomePage } from "@/constants/RoutePath";

export default function FilterSection() {
  const [isMounted, SetIsMounted] = useState(false);
  const scrollPositionRef = useRef(0);

  const router = useRouter();
  const pathname = usePathname();

  const currentRoute = pathname.split("/");

  const searchRef = useRef<HTMLInputElement>(null);
  /*Redux Dispatch & Selector*/
  const dispatch = useDispatch();
  const categoryData = useSelector(
    (store: RootState) => store.categories.categoryData
  );
  const searchQuery = useSelector(
    (store: RootState) => store.searchs.searchQuery
  );
  const filterData = useSelector(
    (store: RootState) => store.searchs.searchFilterList
  );
  const { productList } = useSelector((state: RootState) => state.products);
  const searchToFocusInput = useSelector(
    (state: RootState) => state.searchs.searchToFocus
  );
  const reduxScrollPosition = useSelector(
    (state: RootState) => state.searchs.scrollPosition
  );
  const { priceData, matchedPrice } = useSelector((state: RootState) => state.pricingModels);

  const scrollTimeout = useRef<any>(null);
  const [localScrollPosition, setLocalScrollPosition] = useState(0);

  /*Context Data*/
  const { setVisibleItem } = useVisibleItemContextData();
  const scrollBaseonInnerWidth = () => {
    const currenInnerWidth = typeof (window as any) !== "undefined" ? window.innerWidth : 0;
    if (currenInnerWidth < 768) {
      return dispatch(scrollPage(300));
    }
    else if (currenInnerWidth < 1280) {
      return dispatch(scrollPage(400));
    }
    else {
      return dispatch(scrollPage(600));
    }
  }

  /*Search Functionality*/
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {

    const newSearch = event.target.value.toLowerCase();
    dispatch(setSearchQuery(newSearch));
    scrollBaseonInnerWidth()
    dispatch(clearMatchedPrice());
    dispatch(clearPriceData());
    dispatch(clearCategoryData());
    dispatch(clearMatchedCategory());

    /* Filter data based on the updated search query */
    const filteredResults =
      productList &&
      productList?.filter((searchData: AirtableModel) => {
        const tooldatalist = searchData.fields.Name?.toLowerCase();
        if (newSearch) {
          return tooldatalist?.includes(newSearch);
        }
      });

    if (newSearch === "") {
      // If search is empty, show default data
      dispatch(clearSearchFilterList());
    } else if (filteredResults.length > 0) {
      // If there are filtered results, update filtered data
      dispatch(setSearchFilterList(filteredResults));
    } else {
      // If no results found, show no result message
      dispatch(setSearchFilterList([]));
    }
    setVisibleItem(9);

    setTimeout(() => {
      if (currentRoute.includes("category")) {
        router.replace("/")
        if (searchRef.current) {
          searchRef.current.focus();
        }
      }

    }, 250)

  };

  /* Selected Category functionality */
  const selectedCategory = (selectedOption: any) => {
    if (selectedOption) {
      let categoryVal = selectedOption.value;
      let formatedCategory = categoryVal.toLowerCase().replace(/\s/g, "-");
      dispatch(clearSearchFilterList());
      dispatch(clearMatchedPrice());
      dispatch(clearPriceData());

      dispatch(setCategoryData(categoryVal));
      setVisibleItem(9);
      scrollBaseonInnerWidth()
      const filteredData = productList!.filter(
        (item: AirtableModel) =>
          item.fields.Tags[0]?.toLowerCase().replace(/\s/g, "-") ===
          formatedCategory
      );
      dispatch(setMatchedCategory(filteredData));
    }
  };


  /*Clear Filter*/
  const clearFilter = () => {
    dispatch(setSearchQuery(""));
    dispatch(clearSearchFilterList());
    dispatch(clearMatchedCategory());
    dispatch(clearCategoryData());

    dispatch(clearMatchedPrice());
    dispatch(clearPriceData());

    setVisibleItem(9);
    if (currentRoute.includes("category")) {
      router.replace("/");
    }
  };

  /*Get a List for Category*/
  const getListOfCategory = (): Set<string> => {
    const categoryItem = new Set<string>([]);
    productList?.length > 0 &&
      productList?.map((item: AirtableModel) => {
        if (item?.fields?.Tags !== undefined) {
          categoryItem.add(item?.fields?.Tags[0]);
        }
      });
    return categoryItem;
  };

  const categoryOptionsList = Array.from(getListOfCategory()).map(
    (item: string, index: number) => {
      return {
        value: item,
        label: item,
      };
    }
  );

  useEffect(() => {
    const handleScroll = () => {
      scrollPositionRef.current = window.scrollY;
      setLocalScrollPosition(scrollPositionRef.current);

      // Clear the existing timeout
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      // Set a new timeout
      scrollTimeout.current = setTimeout(() => {
        dispatch(scrollPage(scrollPositionRef.current));
      }, 100); // Adjust this delay as needed
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [dispatch]);
 

  useEffect(() => {
    if (reduxScrollPosition > 0 && reduxScrollPosition !== localScrollPosition) {
      window.scrollTo({ top: reduxScrollPosition, behavior: "smooth" });
    }
  }, [reduxScrollPosition]);

  useEffect(() => {
    SetIsMounted(true);
  }, []);

  useEffect(() => {
    console.log("searchRef", searchRef.current, searchToFocusInput);
    if (searchToFocusInput && searchRef.current) {
      searchRef.current?.focus();
    }
  }, [searchToFocusInput]);


  return (
    <>
      <section className="hidden md:flex flex-wrap justify-center  px-10 py-5 mx-auto text-white   md:gap-4 lg:max-w-5xl xl:max-w-6xl text-Title-Small lg:text-Title-Small">
        <div className=" md:col-span-2">
            <button
              className="w-full px-5 py-3 font-semibold text-center rounded-full bg-DarkOrange lg:px-8 focus:bg-green-200 focus:outline focus:outline-DarkOrange focus:outline-2 "
              onClick={clearFilter}
            >
              All
            </button>
        </div>
        <div className="basis-1/5 z-0">
          <div className="h-full rounded-full bg-DarkOrange">
            {isMounted && (
              <SelectDropdown
                key={categoryData}
                placeholder="Select Category"
                options={categoryOptionsList}
                onChange={selectedCategory}
                value={
                  categoryOptionsList.find(
                    (option) => option.value === categoryData
                  ) || null
                }
              />
            )}
          </div>
        </div>
      
        <div className="font-medium md:col-span-4 lg:col-span-2">
          <div className="">
            <button
              className="w-full px-5 py-3 font-semibold text-center rounded-full bg-DarkOrange whitespace-nowrap focus:bg-green-200 focus:outline focus:outline-DarkOrange focus:outline-2"
              onClick={clearFilter}
            >
              Clear Filters
            </button>
          </div>
        </div>
        <div className="basis-2/5 font-medium">
          <div className=" text-black py-0.5 ">
            <input
              ref={searchRef}
              value={searchQuery}
              onChange={handleSearch}
              className="w-full px-4 py-2 font-medium border-2 border-black border-solid outline-none rounded-xl"
              type="text"
              placeholder="Search By Product Name"
            />
          </div>
        </div>
      </section>

      {/* Visible in mobile screen only */}
      <section className="grid grid-cols-1 md:hidden py-[25px]  gap-3 text-Title-Small lg:text-Title-Large max-w-md mx-auto px-4">
        <div className="col-span-1">
          <input
            className="w-full p-3 font-medium border-2 border-black border-solid outline-none rounded-xl"
            type="text"
            placeholder="Search By Product Name"
            onChange={handleSearch}
            value={searchQuery}
            ref={searchRef}
          />
        </div>
        <div className="col-span-1">
          <div className="w-full text-white rounded-full bg-DarkOrange ">
            {isMounted && (
              <SelectDropdown
                key={categoryData}
                placeholder="Select Category"
                options={categoryOptionsList}
                onChange={selectedCategory}
                value={
                  categoryOptionsList.find(
                    (option) => option.value === categoryData
                  ) || null
                }
              />
            )}
          </div>
        </div>
       
        <div className="col-span-1 font-semibold text-white">
          <div className="grid grid-cols-2 gap-x-4">
            <div className="col-span-1">
              <button
                className="w-full p-3 rounded-full bg-DarkOrange focus:bg-green-200 focus:outline focus:outline-DarkOrange focus:outline-2 "
                onClick={clearFilter}
              >
                All
              </button>
            </div>
            <div className="col-span-1">
              <button
                className="w-full p-3 rounded-full bg-DarkOrange whitespace-nowrap focus:bg-green-200 focus:outline focus:outline-DarkOrange focus:outline-2 "
                onClick={clearFilter}
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
