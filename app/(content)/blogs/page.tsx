import AllBlogs from "@/components/AllBlogs";
import BlogFilter from "@/components/BlogFilter";
import ToggleSwitch from "@/components/BlogFilter/ToggleButton";
import Link from "next/link";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const blogsPage = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="mt-30 max-w-7xl mx-auto w-11/12 relative">
      <div className="flex justify-between items-center mb-12">
        <div className=" inline-flex text-sm gap-1.5">
          <Link href="/" className="text-white/70">
            Home
          </Link>
          <MdOutlineArrowRightAlt className="self-center" />{" "}
          <Link href="/blogs" className="text">
            All Blogs
          </Link>
        </div>
        {session ? <ToggleSwitch /> : null}
      </div>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:flex-2 h-32 lg:order-2 ">
          <BlogFilter />
        </div>
        <div className="lg:flex-5 lg:order-1 h-[1440px] overflow-y-scroll p-2">
          <AllBlogs />
        </div>
      </div>
    </div>
  );
};

export default blogsPage;
