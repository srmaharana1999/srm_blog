import { MdSearch } from "react-icons/md";
import SortBy from "./SortBy";
import { Blogs } from "@/lib/blogs";
import CategorySelector from "./CategorySelector";
import Link from "next/link";
const BlogFilter = () => {
  return (
    <div className="w-full max-w-sm mx-auto flex flex-col gap-8">
      <div className=" w-full flex items-center bg-transparent px-4 py-2 border-shadow h-fit lg:w-full">
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

      <div className="flex gap-4 flex-wrap">
        {/* <FaTags className="absolute -top-1 -left-2 text-2xl text-white/80" /> */}

        <span className="border-shadow border-1 tag px-4 py-2 inline-flex gap-2 cursor-pointer">
          Webdev
        </span>
        <span className=" border-shadow border-1 px-4 py-2  tag cursor-pointer">
          JavaScript
        </span>
        <span className=" border-shadow border-1 tag px-4 py-2  cursor-pointer">
          Blogging
        </span>
        <span className=" border-shadow border-1 tag  px-4 py-2 cursor-pointer">
          Machine Learning
        </span>
        <span className=" border-shadow border-1 tag px-4 py-2 cursor-pointer">
          Artificial Inteligence
        </span>
      </div>

      <div className="hidden lg:block space-y-4 border-2 shadow-shadow rounded-base p-4">
        {Blogs.map((blog, index) =>
          index < 7 ? (
            <div
              key={index}
              className="text-gray-900 hover:text-fuchsia-800 hover:font-bold"
            >
              <Link href="#">
                <p className="text-lg font-medium">{blog.title}</p>
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
