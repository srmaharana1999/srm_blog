import { apiClient } from "@/lib/apiClient";
import { ITag } from "@/lib/models/Tag";
import { create } from "zustand";

interface TagState {
  tags: ITag[];
  selectedTags: ITag[];
  loading: boolean;
  error: string | null;

  initTags: () => Promise<void>;
  addTag: (value: string) => Promise<void>;
  toggleTag: (tag: ITag) => void;
  isSelected: (slug: string) => boolean;
}

export const useTagState = create<TagState>()((set, get) => ({
  tags: [],
  selectedTags: [],
  loading: false,
  error: null,
  initTags: async () => {
    set({ loading: true, error: null });
    try {
      const res = await apiClient.getTags();
      set({ tags: res, loading: false, error: null });
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : String(error) || "Failed to fetch Tags",
        loading: false,
      });
    }
  },
  addTag: async (value: string) => {
    set({ loading: true, error: null });
    try {
      await apiClient.createTag(value);
      await get().initTags();
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : String(error) || "Failed to add Tags",
        loading: false,
      });
    }
  },
  toggleTag: (tag) => {
    const selected = get().selectedTags;
    const exists = selected.some((t) => t.tagSlug === tag.tagSlug);
    set({
      selectedTags: exists
        ? selected.filter((t) => t.tagSlug !== tag.tagSlug)
        : [...selected, tag],
    });
  },
  isSelected: (slug) => get().selectedTags.some((t) => t.tagSlug === slug),
}));
