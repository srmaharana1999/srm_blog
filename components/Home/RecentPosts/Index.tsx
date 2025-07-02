import Link from "next/link";
import RecentPostTile from "./RecentPostTile";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const blogs = [
  {
    imageUrl: "/images/card-img-1.svg",
    title: "10 Tips for Effective Remote Work",
    author: "Jane Doe",
    readMoreUrl: "#",
    createdAt: "2025-06-20",
  },
  {
    imageUrl: "/images/card-img-2.svg",
    title: "Understanding JavaScript Closures",
    author: "John Smith",
    readMoreUrl: "#",
    createdAt: "2025-06-18",
  },
  {
    imageUrl: "/images/card-img-3.svg",
    title: "Why UX Design Matters in 2025",
    author: "Emily Clark",
    readMoreUrl: "#",
    createdAt: "2025-06-15",
  },
  {
    imageUrl: "/images/card-img-4.svg",
    title: "Getting Started with React Server Components",
    author: "Michael Lee",
    readMoreUrl: "#",
    createdAt: "2025-06-12",
  },
  {
    imageUrl: "/images/card-img-5.svg",
    title: "The Future of AI in Education",
    author: "Sara Ali",
    readMoreUrl: "#",
    createdAt: "2025-06-10",
  },
];

const RecentPosts = () => {
  return (
    <div className="my-16 w-full">
      <div className=" flex items-center justify-between mb-10">
        <h2 className="text-2xl">Latest Posts</h2>
        <Link
          href="/blogs"
          className="inline-flex bg-transparent hover:bg-white/10 text-blue-500 ring-1 ring-blue-400 rounded-md py-1.5 px-4 text-sm"
        >
          View More
        </Link>
      </div>

      <Carousel
        className="w-10/12 mx-auto"
        opts={{ slidesToScroll: "auto", dragFree: true }}
      >
        {" "}
        <CarouselContent className="mx-auto ">
          {blogs.map((blog, index) => (
            <CarouselItem key={index} className=" lg:basis-1/2">
              <RecentPostTile {...blog} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default RecentPosts;
