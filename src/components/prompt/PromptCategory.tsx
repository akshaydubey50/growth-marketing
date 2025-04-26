import React from "react";
import { Checkbox } from "../ui/checkbox";

interface PromptCategoryProps {
  categoryList: string[];
  onSelectCategory: (category: string) => void;
  selectedCategories: string[];
}

const PromptCategory: React.FC<PromptCategoryProps> = ({
  categoryList,
  onSelectCategory,
  selectedCategories,
}) => {
  return (
    <>
      <div className="mb-4 text-xl font-bold">Categories</div>
      <div className="space-y-4">
        {categoryList?.map((category, index) => (
          <div
            key={index}
            className="flex items-center"
            onClick={() => onSelectCategory(category)}
          >
            <Checkbox
              id={`category-${index}`}
              checked={selectedCategories.includes(category)}
              onCheckedChange={() => onSelectCategory(category)}
              className="mr-1 gap-2 accent-orange-500
              border-black
              data-[state=checked]:bg-DarkOrange
              data-[state=checked]:text-white
              data-[state=checked]:border-DarkOrange
              "
            />
            <label
              htmlFor={`category-${index}`}
              className="ml-2 text-md leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70
              peer-data-[state=checked]:font-semibold
              "
            >
              {category}
            </label>
          </div>
        ))}
      </div>
    </>
  );
};

export default PromptCategory;
