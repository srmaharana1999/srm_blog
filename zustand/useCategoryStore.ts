import { ICategory } from "@/lib/models/Category";
import { create } from "zustand";
interface CategoryState {
  categories: ICategory[];
  loading: boolean;
  error: string | null;
  initCategories: () => Promise<void>;
}

export const useCategoryState = create<CategoryState>()((set) => ({
  categories: [],
  loading: false,
  error: null,
  initCategories: async () => {
    set({ loading: true, error: null });
    try {
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : String(error) || "Failed to fetch Categories",
        loading: false,
      });
    }
  },
}));
