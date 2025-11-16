import { apiClient } from "@/lib/apiClient";
import { ICategory } from "@/lib/models/Category";
import { create } from "zustand";
interface CategoryState {
  categories: ICategory[];
  loading: boolean;
  error: string | null;
  initCategories: () => Promise<void>;
  addCategory: (value: string) => Promise<boolean>;
}

export const useCategoryState = create<CategoryState>()((set, get) => ({
  categories: [],
  loading: false,
  error: null,
  initCategories: async () => {
    set({ loading: true, error: null });
    try {
      const res = await apiClient.getCategories();
      set({ categories: res, loading: false, error: null });
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
  addCategory: async (value: string) => {
    set({ loading: true, error: null });
    try {
      await apiClient.createCategory(value);
      await get().initCategories();
      return true;
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : String(error) || "Failed to add Category",
        loading: false,
      });
      return false;
    }
  },
}));
