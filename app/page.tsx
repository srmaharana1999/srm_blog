"use client";
import { signIn } from "next-auth/react";

const Home = () => {
  return (
    <div>
      <button onClick={() => signIn()} className="bg-white text-black p-2">
        Signin
      </button>
    </div>
  );
};

export default Home;
