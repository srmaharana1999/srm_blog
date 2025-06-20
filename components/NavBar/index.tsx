"use client";
import { useState } from "react";
import NavLink from "./NavLink";
import { Button } from "../ui/button";
import { IoClose, IoMenu } from "react-icons/io5";
import Link from "next/link";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="fixed top-0 left-1/2 -translate-x-1/2 max-w-7xl w-full h-20 mx-auto bg-white flex justify-between items-center px-6 ">
      <div className="h-7 w-25 lg:w-35 lg:h-8 bg-green-500">LOGO</div>
      <div>
        <ul className="list-none hidden lg:flex gap-10 text-md">
          <NavLink label="Home" href="/" />
          <NavLink label="All Blogs" href="#" />
          <NavLink label="About" href="#" />
          <NavLink label="Contact Us" href="#contact-us" />
        </ul>
      </div>
      <div className=" hidden lg:flex gap-4">
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
        } w-full absolute left-0 lg:hidden top-full h-[calc(100vh-80px)] origin-top bg-white transition-all duration-500 flex flex-col justify-center items-center`}
      >
        <ul className="list-none text-xl flex flex-col justify-center items-center gap-10">
          <NavLink label="Home" href="/" />
          <NavLink label="All Blogs" href="#" />
          <NavLink label="About" href="#" />
          <NavLink label="Contact Us" href="#contact-us" />
          <div className="flex gap-4 ">
            <Link
              href="/sign-in"
              className="text-white font-bold bg-blue-500 px-6 py-2 rounded-3xl "
            >
              Sign in
            </Link>
            <Link
              href="/sign-up/verify-email"
              className="text-white font-bold bg-black px-6 py-2 rounded-3xl"
            >
              Create Account
            </Link>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
