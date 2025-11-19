import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Plus, Tag, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { TAGS } from "@/lib/constants";
import useTagManager from "@/hooks/use-tag-manager";
import useFilteredOptions from "@/hooks/use-filtered-options";
import { useField } from "formik";
import { useTagState } from "@/store/useTagStore";
import { useShallow } from "zustand/react/shallow";

// Main Component
const AdvancedTagInput = (props: { name: string }) => {
  const [inputValue, setInputValue] = useState("");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const { data, createTag } = useTagState(
    useShallow((store) => ({
      data: store.tags,
      createTag: store.addTag,
    }))
  );

  const rawTags = data.map((tag) => tag.tagName);
  const inputRef = useRef<HTMLInputElement>(null);

  const { tags, addTag, removeTag } = useTagManager(TAGS.MAX_TAGS);
  const suggestions = useFilteredOptions(tags, inputValue, rawTags);

  const [, meta, helpers] = useField(props.name);
  const { setTouched, setValue } = helpers;

  useEffect(() => {
    setValue(tags);
  }, [tags, setValue]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setInputValue(value);
  };

  const handleInputKeyDown = async (
    e: KeyboardEvent<HTMLInputElement>
  ): Promise<void> => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (addTag(inputValue)) {
        await createTag(inputValue);
        setInputValue("");
        setIsPopoverOpen(false);
      }
    }

    if (e.key === "Backspace" && !inputValue && tags.length > 0) {
      removeTag(tags[tags.length - 1]);
    }
  };

  const handleSuggestionSelect = (suggestion: string): void => {
    addTag(suggestion);
    setInputValue("");
    setIsPopoverOpen(false);
    inputRef.current?.focus();
  };

  const handleAddClick = async (): Promise<void> => {
    if (addTag(inputValue)) {
      await createTag(inputValue);
      setInputValue("");
      setIsPopoverOpen(false);
    }
  };

  const isMaxReached = tags.length >= TAGS.MAX_TAGS;

  return (
    <div className="w-full">
      <h2 className="text-xl">Advanced Tag Input:</h2>
      <p className="text-xs text-chart-5 leading-6">
        Type to add tags or select from the autosuggest list. Max 5 tags
        allowed.
      </p>
      <p
        className={`text-xs mb-2 text-chart-5 ${
          isMaxReached ? "text-red-500 font-semibold" : "text-muted-foreground"
        }`}
      >
        {tags.length} / {TAGS.MAX_TAGS} Tags Selected
      </p>

      <div>
        {/* Input with Popover */}
        <div className="flex gap-2 mb-2">
          <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
            <PopoverTrigger asChild>
              <div className="flex-grow relative">
                <Input
                  ref={inputRef}
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyDown={handleInputKeyDown}
                  onFocus={() => inputValue && setIsPopoverOpen(true)}
                  onBlur={() => setTouched(true)}
                  placeholder={
                    isMaxReached
                      ? `Max ${TAGS.MAX_TAGS} tags reached`
                      : "Add new tag (press Enter)"
                  }
                  disabled={isMaxReached}
                  className="w-full"
                />
              </div>
            </PopoverTrigger>
            <PopoverContent
              className="w-[var(--radix-popover-trigger-width)] p-0"
              align="start"
              onOpenAutoFocus={(e) => e.preventDefault()}
            >
              <Command>
                <CommandInput
                  placeholder="Search suggestions..."
                  value={inputValue}
                  onValueChange={setInputValue}
                />
                <CommandList>
                  <CommandEmpty>No suggestions found.</CommandEmpty>
                  <CommandGroup heading="Suggestions">
                    {suggestions.map((suggestion) => (
                      <CommandItem
                        key={suggestion}
                        value={suggestion}
                        onSelect={() => handleSuggestionSelect(suggestion)}
                      >
                        <Tag className="mr-2 h-4 w-4 text-gray-400" />
                        {suggestion}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          <Button
            onClick={handleAddClick}
            disabled={!inputValue.trim() || isMaxReached}
            size="default"
          >
            <Plus className="h-4 w-4" /> Add Tag
          </Button>
        </div>

        {/* Display Existing Tags */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="flex items-center gap-1 pr-1 bg-background"
            >
              <span>{tag}</span>
              <button
                onClick={() => removeTag(tag)}
                aria-label={`Remove ${tag}`}
              >
                <X className="h-3 aspect-square" />
              </button>
            </Badge>
          ))}
        </div>
      </div>
      {meta.touched && meta.error ? (
        <p className="text-red-500 text-xs">{meta.error}</p>
      ) : null}
    </div>
  );
};

export default AdvancedTagInput;
