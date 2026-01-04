import BlogTile from "./BlogTile";
import { FaSearch } from "react-icons/fa";
import { IPost } from "@/lib/models/Post";

const AllBlogs = (props: { blogs: IPost[] }) => {
  return (
    <>
      <div className="max-w-lg flex w-full bg-gray-200 border-2 pl-2 rounded border-black h-fit mb-6">
        <input
          className="outline-none w-full"
          name="search"
          placeholder="Search for blogs"
          // onChange={handleSearch}
        />
        <button className="px-6 py-2 bg-gray-400 text-white hover:bg-gray-500 cursor-pointer">
          <FaSearch className="text-2xl" />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {props.blogs.map((blog) => (
          <BlogTile key={blog.slug} post={blog} />
        ))}
      </div>
    </>
  );
};

export default AllBlogs;
