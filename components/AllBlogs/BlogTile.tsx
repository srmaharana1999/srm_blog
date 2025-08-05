import { IBlog } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { RxAvatar } from "react-icons/rx";
const BlogTile = (props: IBlog) => {
  return (
    <div className="group w-full md:h-48 flex flex-col md:flex-row items-center border-shadow">
      <div className="h-52 md:h-full w-full  md:flex-1 relative bg-white/20 rounded-t-base md:rounded-r-none md:rounded-bl-base">
        <Image
          src={props.imageUrl}
          alt="post_image"
          fill
          className="object-fill rounded-t-base md:rounded-r-none md:rounded-bl-base"
        />
      </div>
      <div className="bg-white/20 text-black/70 hover:text-black group-hover:bg-white h-full flex-3 rounded-b-base md:rounded-r-base md:rounded-l-none p-4 flex flex-col">
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
