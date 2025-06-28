import Link from "next/link";
import { HiArrowNarrowRight } from "react-icons/hi";

const CTA = () => {
  return (
    <div>
      <Link
        href="#recent"
        className="pr-8 p-6 w-fit text-xl text-left font-semibold py-2 bg-gradient-to-r from-fuchsia-500 to-cyan-500 rounded-full md:rounded-l-none mx-auto md:mx-0 flex items-center gap-4"
      >
        Recent Posts <HiArrowNarrowRight />
      </Link>
    </div>
  );
};

export default CTA;
