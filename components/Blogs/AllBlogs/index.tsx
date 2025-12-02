import { Blogs } from "@/lib/blogs";
import BlogTile from "./BlogTile";
import Link from "next/link";
import { MdOutlineArrowRightAlt } from "react-icons/md";

const AllBlogs = () => {
  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <div className=" inline-flex text-sm gap-1.5">
          <Link href="/" className="text-black/80">
            Home
          </Link>
          <MdOutlineArrowRightAlt className="self-center" />{" "}
          <Link href="/blogs" className="text">
            All Blogs
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Blogs.map((blog, index) => (
          <BlogTile key={index} {...blog} />
        ))}
      </div>
    </>
  );
};

export default AllBlogs;
