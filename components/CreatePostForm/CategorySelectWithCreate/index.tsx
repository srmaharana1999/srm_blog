"use client";

import { useRef, useState, useMemo } from "react";
import { useCategoryState } from "@/zustand/useCategoryStore";
import { FaPlus } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useField } from "formik";
import toast from "react-hot-toast";
import CategorySelector from "./CategorySelector";
import useDropdown from "@/hooks/useDropDown";

const CategorySelectWithCreate = () => {
  const selectorRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [field, meta, helpers] = useField("category");
  const { setValue } = helpers;

  const createCategory = useCategoryState((state) => state.createNewCategory);
  const categoriesRaw = useCategoryState((state) => state.categories);
  const loading = useCategoryState((state) => state.loading);

  const { dropDownOpen, setDropDownOpen } = useDropdown({ selectorRef });

  const categories = useMemo(() => {
    const all = categoriesRaw.map((cat) => cat.category_name || "");
    if (!query) return all;
    return all.filter((cat) => cat.toLowerCase().includes(query.toLowerCase()));
  }, [categoriesRaw, query]);

  const handleSelect = (cat: string) => {
    setQuery(cat);
    setValue(cat);
    setDropDownOpen(false);
  };

  const handleCreate = async () => {
    const trimmed = query.trim();
    if (!trimmed) return;

    if (!categories.includes(trimmed)) {
      try {
        await createCategory(trimmed);
        toast.success(`${trimmed} category created!`);
      } catch (error) {
        toast.error("Error occurred!");
        console.error(error);
      }
    }
    setQuery(trimmed);
    setValue(trimmed);
    setDropDownOpen(false);
  };

  return (
    <div ref={selectorRef} className="w-full relative mt-1">
      <div className="grid gap-2">
        <Input
          type="text"
          name="category"
          value={query}
          className="py-6 text-lg capitalize"
          onChange={(e) => {
            setQuery(e.target.value);
            setValue(e.target.value);
            setDropDownOpen(true);
          }}
          onBlur={field.onBlur}
          onFocus={() => setDropDownOpen(true)}
          placeholder="Enter your category"
        />
        <Button
          className="h-full cursor-pointer"
          onClick={handleCreate}
          disabled={!!categories.find((c) => c === query.trim()) || loading}
        >
          {loading ? (
            "Loading..."
          ) : (
            <>
              <FaPlus /> Create A Category
            </>
          )}
        </Button>
        {meta.touched && meta.error && (
          <p className="text-red-500 text-xs">{meta.error}</p>
        )}
      </div>
      <CategorySelector
        isModalOpen={dropDownOpen}
        categories={categories}
        onSelect={handleSelect}
      />
    </div>
  );
};

export default CategorySelectWithCreate;
