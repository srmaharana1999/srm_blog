import { useState } from "react";

export function useCategory(initialValues: string[]) {
  const [categories, setCategories] = useState<string[]>(initialValues);
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [dropDownOpen, setDropDownOpen] = useState(false);

  const filteredCategories = categories.filter((cat) =>
    cat.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (cat: string) => {
    setSelectedCategory(cat);
    setQuery(cat);
    setDropDownOpen(false);
  };

  const handleCreate = () => {
    alert("clicked");
    const trimmed = query.trim();
    if (!trimmed) return;
    if (!categories.includes(trimmed)) {
      setCategories([...categories, trimmed]);
    }
    setSelectedCategory(trimmed);
    setDropDownOpen(false);
  };
  return {
    query,
    categories,
    dropDownOpen,
    selectedCategory,
    setQuery,
    setCategories,
    setDropDownOpen,
    setSelectedCategory,
    filteredCategories,
    handleSelect,
    handleCreate,
  };
}
