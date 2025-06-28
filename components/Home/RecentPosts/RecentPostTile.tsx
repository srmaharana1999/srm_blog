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
    <div className="w-full h-full border-1 rounded-2xl flex flex-col">
      <div className="h-72 w-full relative bg-white rounded-t-xl">
        <Image
          src={props.imageUrl}
          alt="post_1"
          fill
          className="object-contain"
        />
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h3 className="font-semibold m-2">{props.title}</h3>
        <p className="mx-2 italic">{props.author}</p>
      </div>

      <div className="flex justify-between text-white/70 text-sm mt-auto m-2">
        <span className="text-left">{props.createdAt}</span>
        <Link href="#" className="text-right">
          Read More
        </Link>
      </div>
    </div>
  );
};

export default RecentPostTile;
