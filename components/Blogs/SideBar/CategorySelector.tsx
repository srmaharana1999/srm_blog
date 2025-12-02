"use client";

import { CheckIcon, ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { cn } from "@/lib/utils";
import { useShallow } from "zustand/react/shallow";
import { useCategoryState } from "@/store/useCategoryStore";
import { useState } from "react";

export default function CategorySelector() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const { categories, loading } = useCategoryState(
    useShallow((store) => ({
      categories: store.categories,
      loading: store.loading,
    }))
  );

  const selectedNames = categories
    .filter((cat) => selected.includes(cat.catSlug))
    .map((c) => c.catName);

  const toggleCategory = (slug: string) => {
    setSelected((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  const buttonLabel =
    selected.length === 0
      ? "Select Category..."
      : selectedNames.length <= 1
      ? selectedNames.join(",")
      : `${selectedNames.length} selected`;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="noShadow"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between bg-gray-300 text-gray-800"
        >
          {buttonLabel}
          <ChevronsUpDown />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        sideOffset={0}
        className="w-(--radix-popover-trigger-width) border-0 p-0"
      >
        <Command className="**:data-[slot=command-input-wrapper]:h-11 bg-gray-400 rounded">
          <CommandInput
            placeholder="Search Category..."
            onValueChange={(v: string) => setQuery(v)}
          />
          <CommandList className="p-1 my-scrollbar">
            <CommandGroup>
              {categories.length <= 0 && loading ? (
                <p>Loading...</p>
              ) : (
                categories
                  .filter((category) =>
                    category.catName.toLowerCase().includes(query.toLowerCase())
                  )
                  .map((cat) => (
                    <CommandItem
                      key={cat.catSlug}
                      value={cat.catSlug}
                      onSelect={(currentValue) => {
                        toggleCategory(currentValue);
                      }}
                    >
                      {cat.catName}
                      <CheckIcon
                        className={cn(
                          "ml-auto",
                          selected.includes(cat.catSlug)
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))
              )}
            </CommandGroup>
            <CommandEmpty>No Data.</CommandEmpty>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
