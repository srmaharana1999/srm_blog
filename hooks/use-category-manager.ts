import { CATEGORIES } from "@/lib/constants";
import { useCallback, useState } from "react";

// Custom Hook for Category Management
const useCategoryManager = () => {
  const [categories, setCategories] = useState<string[]>(
    CATEGORIES.INITIAL_SUGGESTIONS
  );

  const addCategory = useCallback(
    (newCategory: string): boolean => {
      const trimmedCategory = newCategory.trim();

      if (categories.includes(trimmedCategory)) {
        return false;
      }

      setCategories((prev) => [...prev, trimmedCategory]);
      return true;
    },
    [categories]
  );
  return { categories, addCategory };
};

export default useCategoryManager;
