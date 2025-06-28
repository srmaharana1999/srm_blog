"use client";
import { useState } from "react";
import NavLink from "./NavLink";
import { Button } from "../ui/button";
import { IoClose, IoMenu } from "react-icons/io5";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  console.log("from navbar", session);
  return (
    <div className="group fixed top-0 left-1/2 -translate-x-1/2 max-w-7xl w-full h-20 mx-auto text-black flex justify-between items-center px-6 border-b-1 border-violet-400 z-30 ">
      <div className="text-white lower-bar border-1 p-2 rounded-md bg-black/15">
        <div className="flex text-3xl text-chart-1 left-bar pl-1">
          <span className="text-chart-1 font-semibold px-1">blog</span>

          <div className="flex bg-white/60 rounded-t-xl px-1">
            <p className="text-white group-hover:text-black">IT </p>&#45;
            <p className="text-black group-hover:text-white font-bold">X</p>
          </div>
        </div>
      </div>
      <div>
        <ul className="list-none hidden lg:flex gap-10 text-md ">
          <NavLink label="Home" href="/" />
          <NavLink label="All Blogs" href="#" />
          <NavLink label="About" href="#" />
          <NavLink label="Contact Us" href="#contact-us" />
        </ul>
      </div>
      <div className=" hidden lg:block">
        {!session ? (
          <div className="flex gap-4">
            <Link
              href="/sign-in"
              className="text-white font-bold bg-blue-500 px-6 py-2 rounded-3xl text-sm"
            >
              Sign in
            </Link>
            <Link
              href="/sign-up/verify-email"
              className="text-black bg-fuchsia-200 px-6 py-2 rounded-3xl text-sm font-bold"
            >
              Create Account
            </Link>
          </div>
        ) : (
          <div>
            <button
              onClick={() => signOut()}
              className="text-white font-bold bg-red-500 px-6 py-2 rounded-3xl text-sm"
            >
              Sign out
            </button>
          </div>
        )}
      </div>
      <div className="lg:hidden">
        <Button
          className="border-2 rounded-lg px-2 py-1"
          type="button"
          onClick={() => setOpen((state) => !state)}
        >
          {open ? (
            <IoClose className="text-2xl" />
          ) : (
            <IoMenu className="text-2xl" />
          )}
        </Button>
      </div>
      <div
        className={`${
          open ? "translate-x-0" : "-translate-x-[100vw]"
        } w-full absolute left-0 lg:hidden top-full h-[calc(100vh-80px)] origin-top bg-gradient-to-r from-slate-900 to-slate-700 transition-all duration-500 flex flex-col justify-center items-center`}
      >
        <ul className="list-none text-xl flex flex-col justify-center items-center gap-10">
          <NavLink label="Home" href="/" />
          <NavLink label="All Blogs" href="#" />
          <NavLink label="About" href="#" />
          <NavLink label="Contact Us" href="#contact-us" />
          <div className=" block lg:hidden">
            {!session ? (
              <div className="flex gap-4">
                <Link
                  href="/sign-in"
                  className="text-white font-bold bg-blue-500 px-6 py-2 rounded-3xl text-sm"
                >
                  Sign in
                </Link>
                <Link
                  href="/sign-up/verify-email"
                  className="text-white bg-black px-6 py-2 rounded-3xl text-sm font-bold"
                >
                  Create Account
                </Link>
              </div>
            ) : (
              <div>
                <button
                  type="button"
                  onClick={() => signOut()}
                  className="text-white font-bold bg-red-500 px-6 py-2 rounded-3xl text-sm"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
