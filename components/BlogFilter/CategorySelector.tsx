"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCategoryState } from "@/store/useCategoryStore";
import { useShallow } from "zustand/react/shallow";
const CategorySelector = () => {
  const { categories, loading } = useCategoryState(
    useShallow((store) => ({
      categories: store.categories,
      loading: store.loading,
    }))
  );
  console.log(categories);
  return (
    <Select>
      <SelectTrigger className=" w-full border-shadow">
        <SelectValue placeholder="Category" className="text-black" />
      </SelectTrigger>
      <SelectContent className="text-black">
        {categories.length <= 0 && loading ? (
          <p>Loading</p>
        ) : (
          categories.map((category) => (
            <SelectItem
              key={category.id?.toString() || category.catSlug}
              value={category.catSlug}
            >
              {category.catName}
            </SelectItem>
          ))
        )}
      </SelectContent>
    </Select>
  );
};

export default CategorySelector;
