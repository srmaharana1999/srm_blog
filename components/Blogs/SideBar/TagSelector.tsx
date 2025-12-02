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
import { useTagState } from "@/store/useTagStore";
import { useShallow } from "zustand/react/shallow";
import { useState } from "react";

export default function TagSelector() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string[]>([]);

  const { tags, loading } = useTagState(
    useShallow((store) => ({
      tags: store.tags,
      loading: store.loading,
    }))
  );

  const selectedNames = tags
    .filter((t) => selected.includes(t.tagSlug))
    .map((t) => t.tagName);

  const toggleTag = (slug: string) => {
    setSelected((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  const buttonLabel =
    selected.length === 0
      ? "Select Tags..."
      : selected.length <= 3
      ? selectedNames.join(", ")
      : `${selected.length} selected`;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="noShadow"
          role="combobox"
          className="w-full justify-between bg-gray-300 text-gray-800"
        >
          <span className="truncate">{buttonLabel}</span>
          <ChevronsUpDown />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        sideOffset={0}
        className="w-(--radix-popover-trigger-width) border-0 p-0 "
      >
        <Command
          className="**:data-[slot=command-input-wrapper]:h-11 bg-gray-400 rounded"
          onValueChange={(v: string) => setQuery(v)}
        >
          <CommandInput placeholder="Search Tags..." />
          <CommandList className="p-1">
            <CommandGroup>
              {tags.length <= 0 && loading ? (
                <p className="p-2">Loading...</p>
              ) : (
                tags
                  .filter((t) =>
                    query.trim() === ""
                      ? true
                      : t.tagName.toLowerCase().includes(query.toLowerCase())
                  )
                  .map((tag) => (
                    <CommandItem
                      key={tag.tagSlug}
                      value={tag.tagSlug}
                      onSelect={(currentValue) => {
                        toggleTag(currentValue);
                      }}
                    >
                      <span>{tag.tagName}</span>

                      <CheckIcon
                        className={cn(
                          "ml-auto",
                          selected.includes(tag.tagSlug)
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))
              )}
            </CommandGroup>
            <CommandEmpty>No tags found.</CommandEmpty>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
