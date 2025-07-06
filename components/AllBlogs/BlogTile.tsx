import { IBlog } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { RxAvatar } from "react-icons/rx";
const BlogTile = (props: IBlog) => {
  return (
    <div className="group w-full md:h-48 ring-1 hover:ring-0 ring-white/60 rounded-xl flex flex-col md:flex-row items-center hover:shadow-md hover:shadow-green-100 hover:-translate-y-2 transition-all duration-200 ease-in-out">
      <div className="h-52 md:h-full w-full  md:flex-1 relative bg-white/20 rounded-t-xl md:rounded-r-none md:rounded-bl-xl">
        <Image
          src={props.imageUrl}
          alt="post_image"
          fill
          className="object-fill rounded-t-xl md:rounded-r-none md:rounded-bl-xl"
        />
      </div>
      <div className="bg-white/20 text-white group-hover:bg-white/30 h-full flex-3 rounded-b-xl md:rounded-r-xl md:rounded-l-none p-4 flex flex-col">
        <Link href={props.readMoreUrl}>
          <h1 className="text-lg md:text-2xl mb-2">{props.title}</h1>
        </Link>

        <p className="line-clamp-2 max-sm:text-sm">{props.description}</p>
        <Link
          href={props.readMoreUrl}
          className="italic font-light text-sm hover:text-blue-600 hover:font-medium w-fit mb-4"
        >
          Learn More
        </Link>

        <div className="flex gap-2 items-center justify-between  mt-auto">
          <span className="inline-flex items-center gap-2 ">
            <RxAvatar className="text-2xl cursor-pointer" />
            <p className="italic cursor-pointer">{props.author}</p>
          </span>

          <span className="tag">new</span>
        </div>
      </div>
    </div>
  );
};

export default BlogTile;
