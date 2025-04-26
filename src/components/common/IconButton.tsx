// IconButton.js
import React, { ReactNode } from "react";

interface IconButtonProps {
  icon: ReactNode;
  onClick: () => void;
  title: string;
}

const IconButton: React.FC<IconButtonProps> = ({ icon, onClick, title }) => {
  return (
    <div className="flex flex-col place-items-center  space-y-4 cursor-pointer">
      <button
        className={`text-tags bg-opacity-50 rounded-full p-3 xl:p-6  "bg-gray-200" : "bg-gray-300"
                     hover:bg-opacity-75 focus:outline-none`}
        onClick={onClick}
      >
        {icon}
      </button>
      <p className="font-medium text-Title-Small xl:text-Title-Medium">
        {title}
      </p>
    </div>
  );
};

export default IconButton;
