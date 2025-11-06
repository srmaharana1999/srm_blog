import CTA from "@/components/CTA";
import RecentPost from "@/components/Home/RecentPost";
import RecentPosts from "@/components/Home/RecentPosts/Index";
import Image from "next/image";

const Home = () => {
  return (
    <div className="mt-25 max-w-7xl mx-auto w-full">
      <div className="w-11/12 h-[calc(100vh-10rem)] mx-auto flex flex-col-reverse items-center justify-around md:flex-row text-white gap-6 md:gap-0">
        <div className="w-full md:w-1/2 bg-amber-90 md:gap-0 text-center md:text-left">
          <h1 className="text-5xl lg:text-7xl font-semibold">
            <p className="text-black inline">
              <span className="font-bold">blog</span> IT.
            </p>
            <p className="text-fuchsia-500 inline">
              <span className="font-bold">post</span> IT.
            </p>{" "}
            <br />
            <span className="text-blue-500">
              Rule the <span className="font-bold">Feed</span>!
            </span>
          </h1>
          <h3 className="text-2xl lg:text-3xl text-black my-4">
            Got something to say?{" "}
          </h3>
          <p className="md:text-xs lg:text-lg text-chart-5 tracking-widest mb-14">
            Start your own{" "}
            <span className="text-fuchsia-500 font-semibold">post</span>, share
            cool ideas, post fun stuff, and see what others are writing too.
            It&apos;s easy, exciting, and totally yours!
          </p>
          <CTA />
        </div>

        <div className="w-fit h-fit bg-gradient-to-r from-violet-200 to-pink-200 rounded-2xl border-2 border-border">
          <Image
            src="/images/hero-image.png"
            alt="hero_image"
            height={500}
            width={500}
            className="object-containb "
          />
        </div>
      </div>
      <div className="w-11/12 mx-auto my-16">
        <RecentPost />
        <RecentPosts />
      </div>
    </div>
  );
};

export default Home;
