import { Blogs } from "@/lib/blogs";
import BlogTile from "./BlogTile";

const AllBlogs = () => {
  return (
    <div className="w-full flex flex-col gap-8">
      {Blogs.map((blog, index) => (
        <BlogTile key={index} {...blog} />
      ))}
    </div>
  );
};

export default AllBlogs;
