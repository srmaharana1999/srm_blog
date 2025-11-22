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
import { useField } from "formik";
import { useShallow } from "zustand/react/shallow";
import { useCategoryState } from "@/store/useCategoryStore";
// Main Component
const CategoryInput = (props: { name: string }) => {
  const [inputValue, setInputValue] = useState("");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const { categories, loading, addCategory } = useCategoryState(
    useShallow((store) => ({
      categories: store.categories,
      loading: store.loading,
      addCategory: store.addCategory,
    }))
  );
  const [field, meta, helpers] = useField(props.name);
  const { setValue } = helpers;

  const filteredCategories = categories.filter((cat) =>
    cat.catName.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setValue(value);
    setInputValue(value);
  };

  const handleInputKeyDown = async (
    e: KeyboardEvent<HTMLInputElement>
  ): Promise<void> => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (await addCategory(inputValue)) {
        setValue(inputValue);
        setInputValue("");
        setIsPopoverOpen(false);
      }
    }
  };

  const handleSuggestionSelect = (suggestion: string): void => {
    setInputValue(suggestion);
    setValue(suggestion);
    setIsPopoverOpen(false);
    inputRef.current?.focus();
  };

  const handleAddClick = async (): Promise<void> => {
    if (await addCategory(inputValue)) {
      setInputValue("");
      setIsPopoverOpen(false);
    }
  };
  return (
    <div className="w-full">
      <h2 className="text-xl">Category: </h2>
      <p className="text-xs text-chart-5 mb-2">
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
                  value={field.value}
                  onChange={handleInputChange}
                  onKeyDown={handleInputKeyDown}
                  onFocus={() => inputValue && setIsPopoverOpen(true)}
                  onBlur={() => helpers.setTouched(true)}
                  placeholder="Add new category (press Enter)"
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
                    {loading ? (
                      <p>Loading..</p>
                    ) : (
                      filteredCategories.map((cat) => (
                        <CommandItem
                          key={cat.catSlug}
                          value={cat.catName}
                          onSelect={() => handleSuggestionSelect(cat.catName)}
                        >
                          {cat.catName}
                        </CommandItem>
                      ))
                    )}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          <Button
            onClick={handleAddClick}
            disabled={
              !!categories.find((cat) =>
                cat.catName.toLowerCase().includes(inputValue.toLowerCase())
              )
            }
            size="default"
          >
            <Plus className="h-4 w-4" /> Add Category
          </Button>
        </div>
      </div>
      {meta.touched && meta.error ? (
        <p className="text-red-500 text-xs">{meta.error}</p>
      ) : null}
    </div>
  );
};

export default CategoryInput;
