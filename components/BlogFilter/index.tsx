import { MdSearch } from "react-icons/md";
import SortBy from "./SortBy";
import { Blogs } from "@/lib/blogs";
import CategorySelector from "./CategorySelector";
import { FaTags } from "react-icons/fa";
const BlogFilter = () => {
  return (
    <div className="w-full flex flex-col gap-8">
      <div className="flex items-center bg-transparent px-4 py-2 border-1 shadow-md rounded-lg h-fit lg:w-full">
        <MdSearch className="text-2xl text-gray-400" />
        <input
          className="outline-none ml-2 w-full"
          name="search"
          placeholder="Search"
          // onChange={handleSearch}
        />
      </div>
      <div className="flex gap-4">
        <SortBy />
        <CategorySelector />
      </div>

      <div
        className="bg-white/30 h-32 w-2xs mx-auto relative p-4 rounded-2xl shadow-md shadow-white/80"
        style={{ transform: "rotate(-5deg)" }}
      >
        <FaTags className="absolute -top-3 left-0 text-2xl text-white" />

        <span className="absolute shadow-md left-4 tag px-4 py-2 inline-flex gap-2 hover:bg-violet-700 hover:text-white cursor-pointer">
          Webdev
        </span>
        <span className="absolute shadow-md right-4 px-4 py-2 tag hover:bg-fuchsia-600 hover:text-white cursor-pointer">
          JavaScript
        </span>
        <span className="absolute shadow-md bottom-3 tag px-4 py-2 inline-flex gap-2 hover:bg-amber-900 hover:text-white cursor-pointer">
          Blogging
        </span>
        <span className="absolute shadow-md bottom-1/3 left-1/3 tag px-4 py-2 inline-flex gap-2 hover:bg-black/60 hover:text-white cursor-pointer">
          AI
        </span>
      </div>

      <div className="space-y-4 border-dotted border-1 p-4">
        {Blogs.map((blog, index) => (
          <div key={index}>
            <p className="text-xl text-fuchsia-300 font-medium">{blog.title}</p>
            <p className="inline-flex items-center text-sm font-light">
              {blog.author}&#32;&#8226;&#32;{blog.createdAt}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogFilter;
