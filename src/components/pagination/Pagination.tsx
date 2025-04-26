// Pagination.js
import React, { useState, useEffect } from "react";
interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsCount:number
  onPageChange: (page: number) => void;
}
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight, MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";


function Pagination({
  currentPage, itemsCount,
  totalItems,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsCount);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;
  const [inputValue, setInputValue] = useState(currentPage.toString());
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const currentPageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputVal = e.target.value;
    // Only allow numeric input
    if (/^\d*$/.test(inputVal)) {
      const numValue = parseInt(inputVal);
      if (!isNaN(numValue)) {
        if (numValue > totalPages) {
          setInputValue(totalPages.toString());
          handlePageChange(totalPages);
        } else if (numValue < 1) {
          setInputValue("1");
          handlePageChange(numValue);
        } else {
          setInputValue(inputVal);
          handlePageChange(numValue);
        }
      } else if (inputVal === "") {
        setInputValue("");
      }
    }
  };
  useEffect(() => {
    setInputValue(currentPage.toString());
  }, [currentPage]);

  return (
    <div className="flex flex-row justify-center items-center my-6 gap-6  px-10 lg:px-8 2xl:px-0 ">
      <button
        className={`hidden md:inline-block px-4 py-2   rounded-md shadow-lg border border-DarkOrange  ${
          isFirstPage ? "cursor-not-allowed" : "cursor-pointer font-semibold"
        }  ${
          isFirstPage
            ? "bg-white text-DarkOrange "
            : "bg-DarkOrange text-white"
        }  `}
        disabled={isFirstPage}
        onClick={() => handlePageChange(1)}
      >
        <span className="text-xl">
          <MdKeyboardDoubleArrowLeft />
        </span>
      </button>

      <button
        className={` px-4 py-2   rounded-md shadow-lg border border-DarkOrange ${isFirstPage ? "cursor-not-allowed" : "cursor-pointer font-semibold"
          }  ${isFirstPage
            ? "bg-white text-DarkOrange  "
            : "bg-DarkOrange text-white"
          }  `}
        disabled={isFirstPage}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        <span className="text-xl">
          <MdKeyboardArrowLeft />
        </span>
      </button>


      <div className="">
        <div className="flex space-x-2 items-center text-slate-600">
          {/* Page: {currentPage} of {totalPages} */}
          <input
            type="text"
            value={inputValue}
            onChange={currentPageHandler}
            className="w-10 text-center border-2 border-slate-400 rounded p-1 outline-2"
          />
          <p className="text-slate-600">of</p>
          <p className="text-slate-600">{totalPages}</p>
        </div>
      </div>
      
      <button
        className={` px-4 py-2   rounded-md shadow-lg border border-DarkOrange ${isLastPage ? "cursor-not-allowed" : "cursor-pointer font-semibold"
          }  ${isLastPage
            ? "bg-white text-DarkOrange  "
            : "bg-DarkOrange text-white"
          }  `}
        disabled={isLastPage}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        <span className="text-xl">
          <MdKeyboardArrowRight />
        </span>
      </button>

      <button
        className={`hidden md:inline-block px-4 py-2   rounded-md shadow-lg border border-DarkOrange  ${isLastPage ? "cursor-not-allowed" : "cursor-pointer font-semibold"
          }  ${isLastPage
            ? "bg-white text-DarkOrange "
            : "bg-DarkOrange text-white"
          }  `}
        disabled={isLastPage}
        onClick={() => handlePageChange(totalPages)}
      >
        <span className="text-xl">
          <MdKeyboardDoubleArrowRight />
        </span>
      </button>
    </div>
  );
}

export default Pagination;
