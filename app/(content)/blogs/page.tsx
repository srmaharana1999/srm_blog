import AllBlogs from "@/components/AllBlogs";
import BlogFilter from "@/components/BlogFilter";
import Link from "next/link";
import { MdOutlineArrowRightAlt } from "react-icons/md";
const blogsPage = () => {
  return (
    <div className="mt-30 max-w-7xl mx-auto w-11/12 relative">
      <div className="inline-flex text-sm mb-10 gap-1.5">
        <Link href="/" className="text-white/70">
          Home
        </Link>
        <MdOutlineArrowRightAlt className="self-center" />{" "}
        <Link href="/blogs" className="text">
          All Blogs
        </Link>
      </div>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:flex-2 h-32 lg:order-2">
          <BlogFilter />
        </div>
        <div className="lg:flex-5 lg:order-1">
          <AllBlogs />
        </div>
      </div>
    </div>
  );
};

export default blogsPage;
