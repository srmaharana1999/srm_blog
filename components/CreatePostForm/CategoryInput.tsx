import { ChangeEvent, KeyboardEvent, useRef, useState } from "react";
import { Plus } from "lucide-react";
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
import useCategoryManager from "@/hooks/use-category-manager";

// Main Component
const CategoryInput = () => {
  const [inputValue, setInputValue] = useState("");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const { categories, addCategory } = useCategoryManager();
  const filteredCategories = categories.filter((cat) =>
    cat.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setInputValue(value);
  };

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (addCategory(inputValue)) {
        setInputValue("");
        setIsPopoverOpen(false);
      }
    }
  };

  const handleSuggestionSelect = (suggestion: string): void => {
    addCategory(suggestion);
    setInputValue(suggestion);
    setIsPopoverOpen(false);
    inputRef.current?.focus();
  };

  const handleAddClick = (): void => {
    if (addCategory(inputValue)) {
      setInputValue("");
      setIsPopoverOpen(false);
    }
  };
  return (
    <div className="w-full">
      <h2 className="text-xl">Category: </h2>
      <p className="text-xs text-chart-5">
        Choose a category or create a new one using the + button.
      </p>
      <div className="space-y-4">
        {/* Input with Popover */}
        <div className="flex gap-2">
          <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
            <PopoverTrigger asChild>
              <div className="flex-grow relative">
                <Input
                  ref={inputRef}
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyDown={handleInputKeyDown}
                  onFocus={() => inputValue && setIsPopoverOpen(true)}
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
                    {filteredCategories.map((suggestion) => (
                      <CommandItem
                        key={suggestion}
                        value={suggestion}
                        onSelect={() => handleSuggestionSelect(suggestion)}
                      >
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
            disabled={
              !!categories.find((cat) =>
                cat.toLowerCase().includes(inputValue.toLowerCase())
              )
            }
            size="default"
          >
            <Plus className="h-4 w-4 mr-2" /> Add Category
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CategoryInput;
