import { useState, useCallback } from "react";

export function usePagination(itemsPerPage: number) {
  const [currentPage, setCurrentPage] = useState(1);

  const updateCurrentProducts = useCallback(
    (products: any[]) => {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      return products.slice(startIndex, endIndex);
    },
    [currentPage, itemsPerPage]
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return { currentPage, updateCurrentProducts, handlePageChange, setCurrentPage };
}
