import { useCallback, useEffect, useState } from "react";

// Custom Hook for Tag Management
const useTagManager = (maxTags: number) => {
  const [tags, setTags] = useState<string[]>([]);

  const addTag = useCallback(
    (tagText: string): boolean => {
      const trimmedTag = tagText.trim();

      if (!trimmedTag || tags.length >= maxTags) {
        return false;
      }

      if (tags.includes(trimmedTag)) {
        return false;
      }

      setTags((prev) => [...prev, trimmedTag]);
      return true;
    },
    [tags, maxTags]
  );

  const removeTag = useCallback((tagToRemove: string): void => {
    setTags((prev) => prev.filter((tag) => tag !== tagToRemove));
  }, []);

  return { tags, addTag, removeTag };
};

export default useTagManager;
