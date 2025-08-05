import Link from "next/link";
import { HiArrowNarrowRight } from "react-icons/hi";

const CTA = () => {
  return (
    <div>
      <Link
        href="#recent"
        className="px-4 py-2 w-fit text-xl font-semibold bg-gradient-to-r from-fuchsia-500 to-cyan-500 mx-auto md:mx-0 flex items-center gap-4 border-shadow"
      >
        Recent Posts <HiArrowNarrowRight />
      </Link>
    </div>
  );
};

export default CTA;
