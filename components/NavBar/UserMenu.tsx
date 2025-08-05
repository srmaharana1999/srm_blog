"use client";
import * as React from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { RxAvatar } from "react-icons/rx";
import Image from "next/image";
import { IUser } from "@/lib/models/User";
import axios from "axios";
import { signOut } from "next-auth/react";

interface IUserProps {
  id: string;
  email: string;
}

const UserMenu = (user: IUserProps) => {
  const [userDetails, setUserDetails] = React.useState<IUser>();
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    const userDataFetch = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `/api/user/user-details?id=${user.id}`
        );
        // const { data } = await res.json();
        setUserDetails(data);
      } catch (error) {
        console.log(error);
        throw error;
      } finally {
        setLoading(false);
      }
    };
    if (user.id && !userDetails) {
      userDataFetch();
    }
  }, [user, userDetails]);
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="w-fit h-fit p-0 list-none ">
            <p className="inline-flex items-center justify-center gap-1 text-sm lg:text-lg">
              {/*  */}
              {loading ? (
                "loading"
              ) : (
                <>
                  <RxAvatar className="hidden md:text-lg md:block " />{" "}
                  {userDetails?.username}
                </>
              )}
            </p>
          </NavigationMenuTrigger>
          <NavigationMenuContent className="bg-background text-gray-800">
            <div className="w-48 border-b-1 pb-2 mb-2 text-xs md:text-sm">
              {!userDetails || !loading ? (
                <>
                  <div className="flex gap-2">
                    <Image
                      src={userDetails?.avatarUrl || "/avatar.png"}
                      alt="user_image"
                      height={44}
                      width={44}
                      className="object-cover rounded-md flex-2"
                    />
                    <div className="flex-4 text-gray-600 text-xs self-center">
                      <p className=" break-all leading-tight mb-2">
                        {userDetails?.email ? userDetails.email : user.email}
                      </p>
                      <p className="">
                        {userDetails?.isAdmin ? "@Admin" : "@blogger"}
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <p>Loading...</p>
              )}
            </div>
            <ul className="flex flex-col list-none text-sm">
              <li>
                <NavigationMenuLink asChild>
                  <Link href="#">View Profile</Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link href="#">Dashboard</Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link
                    href="/blogs/create"
                    className="hover:bg-gradient-to-r hover:from-cyan-500 hover:to-fuchsia-500 hover:text-white"
                  >
                    Create Blog!
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <button
                  onClick={() => signOut()}
                  className="text-white bg-red-600 hover:bg-red-500 font-semibold cursor-pointer py-1 my-1 text-sm w-full border-shadow mt-2"
                >
                  Sign out
                </button>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default UserMenu;
