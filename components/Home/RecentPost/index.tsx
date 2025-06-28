import Image from "next/image";
import Link from "next/link";

const RecentPost = () => {
  return (
    <div className="w-full grid col-span-1 lg:grid-cols-2 gap-10" id="recent">
      <div className="h-full w-full self-center">
        <Image
          src="/images/post-1.png"
          alt="post_image"
          height={200}
          width={550}
          className="object-contain rounded-2xl mx-auto"
        />
      </div>
      <div className="flex flex-col">
        <div className="flex gap-4 my-1">
          <text className="tag">new</text> <text className="tag">article</text>
        </div>

        <h2 className="text-2xl font-medium mb-6">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        </h2>
        <p className="text-justify">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia iusto a
          officia harum! Ratione repellat natus, asperiores ducimus voluptatibus
          nobis neque deserunt animi nesciunt impedit aperiam cupiditate
          repudiandae dignissimos hic!
        </p>
        <Link
          href="#"
          className="italic text-sm mt-auto self-end border-t-1 w-full py-2 text-right pr-4"
        >
          Read Article...
        </Link>
      </div>
    </div>
  );
};
export default RecentPost;
