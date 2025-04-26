import { useState, useEffect, useMemo } from "react";

interface SearchableItem {
  id: string;
  name: string;
}

const useSearch = (
  allItems: SearchableItem[],
  initialSearchText: string = ""
) => {
  const [searchText, setSearchText] = useState(initialSearchText);
  const [searchResults, setSearchResults] =
    useState<SearchableItem[]>(allItems);

  const filteredItems = useMemo(() => {
    if (!searchText.trim()) {
      return allItems;
    }

    const lowercasedSearch = searchText.toLowerCase();
    return allItems.filter(
      (item) => item.name.toLowerCase().includes(lowercasedSearch)
      /* ||
        (item.description &&
          item.description.toLowerCase().includes(lowercasedSearch)
          ) */
    );
  }, [allItems, searchText]);

  useEffect(() => {
    setSearchResults(filteredItems);
  }, [filteredItems]);

  return { searchText, setSearchText, searchResults };
};

export default useSearch;
