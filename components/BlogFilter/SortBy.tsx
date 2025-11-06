"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
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
      <DropdownMenuTrigger asChild>
        <Button className="bg-green-100 w-32 text-black inline-flex items-center justify-evenly">
          Sort By <BiSolidSortAlt />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="">
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
