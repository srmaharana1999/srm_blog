import { MdSearch } from "react-icons/md";
import SortBy from "./SortBy";
import { Blogs } from "@/lib/blogs";
import CategorySelector from "./CategorySelector";
import { FaTags } from "react-icons/fa";
import Link from "next/link";
const BlogFilter = () => {
  return (
    <div className="w-full max-w-sm mx-auto flex flex-col gap-8">
      <div className=" w-full flex items-center bg-transparent px-4 py-2 border-1 shadow-md rounded-lg h-fit lg:w-full">
        <MdSearch className="text-2xl text-gray-400" />
        <input
          className="outline-none ml-2 w-full"
          name="search"
          placeholder="Search"
          // onChange={handleSearch}
        />
      </div>
      <div className=" flex gap-4">
        <SortBy />
        <CategorySelector />
      </div>

      <div
        className="hidden lg:block bg-white/30 h-40 w-2xs mx-auto relative p-4 rounded-2xl shadow-md shadow-white/80 my-10"
        style={{ transform: "rotate(5deg)" }}
      >
        <FaTags className="absolute -top-1 -left-2 text-2xl text-white/80" />

        <span className="absolute shadow-md left-4 tag px-4 py-2 inline-flex gap-2 cursor-pointer">
          Webdev
        </span>
        <span className="absolute shadow-md right-4 px-4 py-2 tag cursor-pointer">
          JavaScript
        </span>
        <span className="absolute shadow-md bottom-3 tag px-4 py-2 inline-flex gap-2 cursor-pointer">
          Blogging
        </span>
        <span className="absolute shadow-md bottom-1/3 left-1/3 tag px-4 py-2 inline-flex gap-2 cursor-pointer">
          AI
        </span>
      </div>

      <div className="hidden lg:block space-y-4 border-dotted border-1 p-4">
        {Blogs.map((blog, index) =>
          index < 7 ? (
            <div key={index}>
              <Link href="#" className="hover:text-fuchsia-100">
                <p className="text-lg text-fuchsia-300 font-medium hover:text-fuchsia-800">
                  {blog.title}
                </p>
              </Link>
              <p className="inline-flex items-center text-xs font-light">
                {blog.author}&#32;&#8226;&#32;{blog.createdAt}
              </p>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default BlogFilter;
