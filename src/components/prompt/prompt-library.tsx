"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../common/Loader/Loader";
import { fetchPromptResourceList } from "@/redux/slice/prompt-resource/promptResource.slice";
import { PropmtResourceModel } from "@/models/airtable.model";
import PromptCategory from "./PromptCategory";
import PromptCard from "./PromptCard";
import Pagination from "../pagination/Pagination";
import { getLikeList } from "@/redux/slice/like/like.slice";
import { getBookmarkList } from "@/redux/slice/bookmark/bookmark.slice";
import { Input } from "@/components/ui/input";

export default function PromptLibrary({itemsCount}:{itemsCount:number}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [promptList, setPromptList] = useState<PropmtResourceModel[]>([]);
  const [filteredPrompts, setFilteredPrompts] = useState<PropmtResourceModel[]>(
    []
  );
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isBookmarkMode, setIsBookmarkMode] = useState(false);

  const dispatch: AppDispatch = useDispatch();
  const { isLoading, isError, promptResourceList } = useSelector(
    (state: RootState) => state.promptResources
  );
  const bookmarkSelector = useSelector(
    (state: RootState) => state.bookmarks.bookmarkList
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getPromptCategory = useCallback(() => {
    const categoryList = new Set();
    if (promptList.length > 0) {
      promptList.forEach((prompt) => {
        if (prompt.fields?.Category?.[0]) {
          categoryList.add(prompt.fields.Category[0]);
        }
      });
    }
    return Array.from(categoryList) as string[];
  }, [promptList]);

  const handleCategorySelect = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
    setCurrentPage(1);
  };

  const isPromptBookmarked = (promptId: string) => {
    const promptBookmarks = bookmarkSelector?.find(
      (bookmark) => bookmark.itemType === "prompts"
    );
    return promptBookmarks ? promptBookmarks.itemIds.includes(promptId) : false;
  };

  const filterPrompts = useCallback(() => {
    let filtered = promptList;
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((prompt) =>
        selectedCategories.includes(prompt.fields?.Category?.[0])
      );
    }
    if (searchQuery) {
      filtered = filtered.filter((prompt) =>
        prompt.fields?.Name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (isBookmarkMode) {
      filtered = filtered.filter((prompt) => isPromptBookmarked(prompt.id));
    }
    setFilteredPrompts(filtered);
  }, [
    promptList,
    selectedCategories,
    searchQuery,
    isBookmarkMode,
    bookmarkSelector,
  ]);

  const updateCurrentProducts = useCallback(() => {
    const startIndex = (currentPage - 1) * itemsCount;
    const endIndex = startIndex + itemsCount;
    return filteredPrompts.slice(startIndex, endIndex);
  }, [currentPage, filteredPrompts]);

  useEffect(() => {
    if (promptResourceList?.length === 0) {
      dispatch(fetchPromptResourceList());
      dispatch(getLikeList());
      dispatch(getBookmarkList());
    }
  }, []);

  useEffect(() => {
    if (!isLoading && promptResourceList?.length > 0) {
      setPromptList(promptResourceList);
      setFilteredPrompts(promptResourceList);
    }
  }, [isLoading, promptResourceList, isError]);

  useEffect(() => {
    filterPrompts();
  }, [
    filterPrompts,
    selectedCategories,
    searchQuery,
    isBookmarkMode,
    bookmarkSelector,
  ]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col pt-10 bg-background">
      {/* Mobile Category Toggle */}
      <div className="block p-4 lg:hidden">
        <Button
          className="flex items-center justify-between w-full border-black bg-light-gray"
          onClick={() => setIsCategoryOpen(!isCategoryOpen)}
        >
          Categories
          {isCategoryOpen ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-6">
        {/* Left Sidebar - Categories */}
        <aside
          className={`col-span-1 lg:col-span-3 p-6 ${
            isCategoryOpen ? "block" : "hidden"
          } lg:block`}
        >
          <PromptCategory
            categoryList={getPromptCategory()}
            onSelectCategory={handleCategorySelect}
            selectedCategories={selectedCategories}
          />
        </aside>

        {/* Main Content */}
        {!isLoading && promptList.length > 0 && (
          <main className="col-span-1 p-4 lg:col-span-9 md:p-6">
            <div className="flex flex-col gap-4 mb-6 sm:flex-row">
              <div className="flex-grow">
                <Input
                  type="text"
                  placeholder="Search prompts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full focus:ring-0 focus:border-DarkOrange focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-DarkOrange"
                />
              </div>
              <div
                className="cursor-pointer sm:w-auto"
                onClick={() => setIsBookmarkMode(!isBookmarkMode)}
              >
                {isBookmarkMode ? (
                  <BsBookmarkFill className="text-2xl text-DarkOrange md:text-3xl lg:text-4xl" />
                ) : (
                  <BsBookmark className="text-2xl text-DarkOrange md:text-3xl lg:text-4xl" />
                )}
              </div>
            </div>
            {filteredPrompts.length > 0 ? (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 md:gap-6">
                {updateCurrentProducts().map((prompt) => (
                  <PromptCard key={prompt.id} promptResource={prompt} />
                ))}
              </div>
            ) : (
              <div className="py-8 text-center">
                {isBookmarkMode ? (
                  <p>No prompts bookmarked yet.</p>
                ) : (
                  <p>No results found.</p>
                )}
              </div>
            )}
            {filteredPrompts.length > 0 && (
              <Pagination
                itemsCount={itemsCount}
                currentPage={currentPage}
                totalItems={filteredPrompts.length}
                onPageChange={handlePageChange}
              />
            )}
          </main>
        )}
      </div>
    </div>
  );
}
