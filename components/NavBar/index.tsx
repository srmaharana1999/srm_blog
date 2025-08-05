"use client";
import { useState } from "react";
import NavLink from "./NavLink";
import { Button } from "../ui/button";
import { IoClose, IoMenu } from "react-icons/io5";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import UserMenu from "./UserMenu";
import Image from "next/image";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const userData = session?.user;
  // console.log("fromnavbar", userData);
  return (
    <div className="group fixed w-full left-1/2 -translate-x-1/2 top-0 bg-[#cccccc]  border-b-1 border-border z-30 ">
      <div className=" max-w-7xl mx-auto w-full h-20 text-black flex justify-between items-center px-6 ">
        <div className="text-black bg-white  lower-bar p-2 border-shadow">
          <div className="flex text-3xl text-chart-1 left-bar">
            <Image
              src="/images/logo.png"
              alt="logo_img"
              height={25}
              width={25}
              className="object-contain"
            />
            <span className="text-chart-1 font-bold capitalize">blog</span>

            <div className="flex rounded-t-xl px-1">
              <p className="text-blue-500 group-hover:text-fuchsia-500 font-bold">
                IT{" "}
              </p>
              &#45;
              <p className="text-fuchsia-500 group-hover:text-blue-500 font-bold">
                X
              </p>
            </div>
          </div>
        </div>
        <div>
          <ul className="list-none hidden lg:flex gap-10 text-md ">
            <NavLink label="Home" href="/" />
            <NavLink label="All Blogs" href="/blogs" />
            <NavLink label="About" href="#" />
            <NavLink label="Contact Us" href="#contact-us" />
          </ul>
        </div>
        <div className=" hidden lg:block">
          {!session ? (
            <div className="flex gap-4">
              <Link
                href="/sign-in"
                className="text-white font-bold bg-blue-500 px-6 py-2 border-shadow"
              >
                Sign in
              </Link>
              <Link
                href="/sign-up/verify-email"
                className="text-black bg-fuchsia-200 px-6 py-2 rounded-sm text-sm font-bold border-2 border-border shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none"
              >
                Create Account
              </Link>
            </div>
          ) : (
            <div className="hidden lg:flex gap-4">
              {session.user ? (
                <UserMenu
                  id={String(session.user.id)}
                  email={session.user.email || ""}
                />
              ) : null}
            </div>
          )}
        </div>
        <div className="lg:hidden flex gap-4">
          {userData ? (
            <UserMenu id={String(userData.id)} email={userData.email || ""} />
          ) : null}
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
            open ? "translate-x-0" : "-translate-x-[110vw]"
          } w-full absolute left-0 lg:hidden top-full h-[calc(100vh-80px)] origin-top bg-[#cccccc] transition-all duration-500 flex flex-col justify-center items-center`}
        >
          <ul className="list-none text-xl flex flex-col justify-center items-center gap-10">
            <NavLink label="Home" href="/" />
            <NavLink label="All Blogs" href="/blogs" />
            <NavLink label="About" href="#" />
            <NavLink label="Contact Us" href="#contact-us" />
            <div className=" block lg:hidden">
              {!session ? (
                <div className="flex gap-4">
                  <Link
                    href="/sign-in"
                    className="text-white font-bold bg-blue-500 px-6 py-2 border-shadow text-sm"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/sign-up/verify-email"
                    className="text-black bg-chart-1 px-6 py-2 border-shadow text-sm font-bold"
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
    </div>
  );
};

export default NavBar;
