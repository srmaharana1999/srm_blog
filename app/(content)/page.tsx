import CTA from "@/components/CTA";
import RecentPost from "@/components/Home/RecentPost";
import RecentPosts from "@/components/Home/RecentPosts/Index";
import Image from "next/image";

const Home = () => {
  return (
    <div className="mt-25 max-w-7xl mx-auto w-full">
      <div className="w-11/12 mx-auto flex flex-col-reverse md:flex-row text-white gap-6 md:gap-0">
        <div className="w-full md:w-1/2 bg-amber-90 flex flex-col gap-6 md:justify-between md:gap-0 text-center md:text-left">
          <h1 className="text-5xl lg:text-7xl font-semibold ">
            <p className="text-black inline">blog IT.</p>
            <p className="text-fuchsia-500 inline">post IT.</p> <br />
            <span className="text-blue-500">Rule the Feed!</span>
          </h1>
          <h3 className="text-2xl lg:text-3xl text-black ">
            Got something to say?{" "}
          </h3>
          <p className="md:text-xs lg:text-lg tracking-widest">
            Start your own{" "}
            <span className="text-fuchsia-500 font-semibold">post</span>, share
            cool ideas, post fun stuff, and see what others are writing too.
            It&apos;s easy, exciting, and totally yours!
          </p>
          <CTA />
        </div>
        <div className="h-full w-full md:w-1/2 justify-items-center md:justify-items-end-safe">
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
      </div>
      <div className="w-11/12 mx-auto my-16">
        <RecentPost />
        <RecentPosts />
      </div>
    </div>
  );
};

export default Home;
