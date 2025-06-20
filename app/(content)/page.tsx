"use client";
import { signOut } from "next-auth/react";

const Home = () => {
  return (
    <div className="mt-22">
      <button
        onClick={() => signOut()}
        className="p-2 text-white bg-gray-500 rounded-2xl"
      >
        Sign OUT
      </button>
    </div>
  );
};

export default Home;
