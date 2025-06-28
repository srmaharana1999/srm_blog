import { HiArrowNarrowRight } from "react-icons/hi";

const CTA = () => {
  return (
    <div>
      <button
        type="button"
        className="pr-8 p-6 text-2xl text-left font-semibold py-2 bg-gradient-to-r from-fuchsia-500 to-cyan-500 rounded-full md:rounded-l-none mx-auto md:mx-0 flex items-center gap-4"
      >
        Let&apos;s Go! <HiArrowNarrowRight />
      </button>
    </div>
  );
};

export default CTA;
