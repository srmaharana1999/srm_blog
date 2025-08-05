import Image from "next/image";
import Link from "next/link";

interface ITileProps {
  imageUrl: string;
  title: string;
  author: string;
  readMoreUrl: string;
  createdAt: string;
}
const RecentPostTile = (props: ITileProps) => {
  return (
    <div className="w-full p-4 min-w-40 h-full border-shadow flex flex-col bg-white/15">
      <div className="h-72 w-full relative rounded-t-xl">
        <Image
          src={props.imageUrl}
          alt="post_1"
          fill
          className="object-contain"
        />
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <h3 className="font-semibold ">{props.title}</h3>
        <p className=" italic">{props.author}</p>
      </div>

      <div className="flex justify-between text-white/70 text-sm mt-auto">
        <span className="text-left">{props.createdAt}</span>
        <Link href="#" className="text-right">
          Read More
        </Link>
      </div>
    </div>
  );
};

export default RecentPostTile;
