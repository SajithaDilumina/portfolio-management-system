import React from "react";

const Categories = ({setCategory}) => {
  return (
    <div>
      <div class="flex overflow-x-auto border border-gray-300 rounded-lg p-2">
        <button
          onClick={()=>{setCategory("Information Technology");}}
          class="inline-block py-1 px-2 bg-gray-200 text-gray-800 rounded-full mr-2"
        >
          Information Technology
        </button>
        <button
          onClick={()=>{setCategory("Photography");}}
          class="inline-block py-1 px-2 bg-gray-200 text-gray-800 rounded-full mr-2"
        >
          Photography
        </button>
        <button
          onClick={()=>{setCategory("Digital");}}
          class="inline-block py-1 px-2 bg-gray-200 text-gray-800 rounded-full mr-2"
        >
          Digital
        </button>
        <button
          onClick={()=>{setCategory("Fashion");}}
          class="inline-block py-1 px-2 bg-gray-200 text-gray-800 rounded-full mr-2"
        >
          Fashion
        </button>
        <button
          onClick={()=>{setCategory("Media");}}
          class="inline-block py-1 px-2 bg-gray-200 text-gray-800 rounded-full mr-2"
        >
          Media
        </button>
        <button
          onClick={()=>{setCategory("Content");}}
          class="inline-block py-1 px-2 bg-gray-200 text-gray-800 rounded-full mr-2"
        >
          Content
        </button>
        <button
          onClick={()=>{setCategory("Manufacturing");}}
          class="inline-block py-1 px-2 bg-gray-200 text-gray-800 rounded-full mr-2"
        >
          Manufacturing
        </button>
        <button
          onClick={()=>{setCategory("Agriculture");}}
          class="inline-block py-1 px-2 bg-gray-200 text-gray-800 rounded-full mr-2"
        >
          Agriculture
        </button>
      </div>
    </div>
  );
};

export default Categories;
