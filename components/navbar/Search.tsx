"use client";

import { BiSearch } from "react-icons/bi";

const Search = () => {

  return (
    <div className="flex items-center justify-start">
      <input
        className="
          border-[1px]
          w-full
          hidden
          text-sm
          sm:block
          md:w-auto
          py-2 px-4
          rounded-full rounded-r-none
          shadow-sm
          hover:shadow-md
          focus:outline-none
          transition
          cursor-text
          placeholder:text-neutral-300
        "
        placeholder="Enter anything..."
      />
      <div
        className="
          flex items-center
          h-full
          py-1 px-4
          bg-none
          bg-center
          cursor-pointer
          hover:bg-neutral-200
          sm:bg-rose-500
          sm:hover:bg-rose-600/90
          sm:rounded-r-full
        "
      >
        <BiSearch
          size={20}
          className="
            text-neutral-700
            sm:text-neutral-100
            md:text-neutral-100
          "
        />
      </div>
    </div>
  );
};

export default Search;
