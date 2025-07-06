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
import { IUser } from "@/models/User";
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
          <NavigationMenuTrigger className="rounded-md ">
            <p className="inline-flex items-center gap-2">
              {/* <RxAvatar className="text-lg" /> */}
              {loading ? (
                <RxAvatar className="text-lg" />
              ) : (
                userDetails?.username || "user"
              )}
            </p>
          </NavigationMenuTrigger>
          <NavigationMenuContent className="bg-black/80 text-white">
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
                    <div className="flex-4 text-white/70 text-xs self-center">
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
            <ul className="flex flex-col list-none">
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
                    href="#"
                    className="hover:bg-gradient-to-r hover:from-fuchsia-500 hover:to-cyan-500 hover:text-white hover:font-medium"
                  >
                    Create a Blog !
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <button
                  onClick={() => signOut()}
                  className="text-white bg-red-600 hover:bg-red-500 font-semibold cursor-pointer rounded-md py-2 text-sm w-full shadow-md mt-2"
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
