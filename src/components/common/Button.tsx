"use client";
import React from "react";

export default function Button({ value }: any) {
  return (
    <React.Fragment>
      <div
        className="flex flex-1 flex-row justify-center items-center py-[20px]
       text-white font-bold text-Title-Medium"
      >
        <button
          className="bg-DarkOrange hover:bg-light-yellow focus:bg-DarkOrange 
        rounded-full px-6 py-2"
        >
          {value}
        </button>
      </div>
    </React.Fragment>
  );
}
