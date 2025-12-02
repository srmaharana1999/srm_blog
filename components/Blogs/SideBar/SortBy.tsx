"use client";

import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BiSolidSortAlt } from "react-icons/bi";
const SortBy = () => {
  const [position, setPosition] = React.useState("bottom");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="bg-gray-300 text-gray-700 text-sm capitalize w-full inline-flex items-center justify-between px-4 py-2 border-2 border-black rounded">
        Sort By <BiSolidSortAlt />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="bg-gray-400" sideOffset={0}>
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          <DropdownMenuRadioItem value="AtoZ">A to Z</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="ZtoA">Z to A</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="newest">
            Newest First
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="oldest">
            Oldest First
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SortBy;
