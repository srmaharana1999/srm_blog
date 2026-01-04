"use client";

import clsx from "clsx";
import { useState } from "react";
import { BsFillFilterSquareFill } from "react-icons/bs";
import { RiCloseFill } from "react-icons/ri";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { FaTags } from "react-icons/fa6";
import AllBlogs from "../AllBlogs";
import { AiOutlineClear } from "react-icons/ai";
import { IoCreate } from "react-icons/io5";
import { FaSort } from "react-icons/fa6";
import SortBy from "./SortBy";
import TagSelector from "./TagSelector";
import CategorySelector from "./CategorySelector";
import { IPost } from "@/lib/models/Post";

const BlogSideBar = (props: { blogs: IPost[] }) => {
  const [isOpen, setOpen] = useState(false);
  const [blogs, setBlogs] = useState<IPost[]>(props.blogs);

  

  return (
    <div className="relative mt-20 h-[calc(100vh-5rem)]">
      {/* Floating Sidebar */}
      <aside className="absolute left-0 inset-y-0 flex z-50">
        {/* Always visible */}
        <div className="w-12 flex flex-col bg-[#969595]  text-gray-100">
          <div className="h-12 flex justify-center items-center border-b border-gray-600">
            <button
              onClick={() => setOpen((prev) => !prev)}
              className="cursor-pointer flex items-center justify-center"
            >
              <BsFillFilterSquareFill className="text-2xl" />
            </button>
          </div>
          <div className="flex flex-col flex-1 items-center gap-4 py-4">
            <button
              className="p-2 rounded-md hover:bg-white/20"
              onClick={() => setOpen((prev) => !prev)}
            >
              <BiSolidCategoryAlt className="text-2xl" />
            </button>
            <button
              className="p-2 rounded-md hover:bg-white/20"
              onClick={() => setOpen((prev) => !prev)}
            >
              <FaTags className="text-2xl" />
            </button>
            <button
              className="p-2 rounded-md hover:bg-white/20"
              onClick={() => setOpen((prev) => !prev)}
            >
              <FaSort className="text-2xl" />
            </button>

            <div className="flex flex-col gap-2 items-center py-2 border-b-1 border-gray-600 border-t-1">
              <button
                className="p-2 rounded-md hover:bg-white/20"
                onClick={() => setOpen((prev) => !prev)}
              >
                <AiOutlineClear className="text-2xl" />
              </button>
              <button
                className="p-2 rounded-md hover:bg-white/20"
                onClick={() => setOpen((prev) => !prev)}
              >
                <IoCreate className="text-2xl" />
              </button>
            </div>
          </div>
        </div>

        <div
          className={clsx(
            "bg-black/80 h-full text-gray-100 overflow-hidden transition-[width,opacity] duration-300 ease-in-out",
            isOpen ? "w-62" : "w-0"
          )}
        >
          <div className="h-12 flex items-center justify-between border-b border-gray-400 px-4">
            <span>Filter Menu</span>

            <button onClick={() => setOpen(false)} className="cursor-pointer">
              <RiCloseFill className="text-xl" />
            </button>
          </div>
          <div className="flex flex-col flex-1 items-center text-gray-900 gap-4 py-4 px-4 ">
            <CategorySelector />
            <TagSelector />
            <SortBy />
          </div>
        </div>
      </aside>
      <div className="h-full ml-12 bg-gray-50 p-6 overflow-y-scroll">
        <AllBlogs blogs={blogs} />
      </div>
    </div>
  );
};

export default BlogSideBar;
