import { IBlog } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { RxAvatar } from "react-icons/rx";
const BlogTile = (props: IBlog) => {
  return (
    <div className="w-full h-44 border-1 hover:border-none rounded-xl flex items-center hover:shadow-md hover:shadow-green-100 hover:-translate-y-2 transition-all duration-200 ease-in-out">
      <div className="h-full flex-1 relative">
        <Image
          src={props.imageUrl}
          alt="post_image"
          fill
          className="object-contain"
        />
      </div>
      <div className="bg-white/20 text-white hover:bg-white/30 h-full flex-3 rounded-r-xl p-4 flex flex-col">
        <Link href={props.readMoreUrl}>
          <h1 className="text-2xl mb-2">{props.title}</h1>
        </Link>

        <p className="line-clamp-2">
          {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
          incidunt excepturi vitae ipsa velit reiciendis accusamus nobis ullam
          iusto iste Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Quibusdam incidunt excepturi vitae ipsa velit reiciendis accusamus
          nobis ullam iusto iste */}
          {props.description}
        </p>
        <Link
          href={props.readMoreUrl}
          className="italic font-light text-sm hover:text-blue-600 hover:font-medium w-fit"
        >
          Learn More
        </Link>

        <div className="flex gap-2 items-center justify-between cursor-pointer mt-auto">
          <span className="inline-flex items-center gap-2">
            <RxAvatar className="text-2xl" />
            <p className="italic">{props.author}</p>
          </span>

          <span className="tag">new</span>
        </div>
      </div>
    </div>
  );
};

export default BlogTile;
