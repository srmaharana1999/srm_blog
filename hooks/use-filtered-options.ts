const useFilteredOptions = (
  selectedItems: string[],
  searchTerm: string,
  allOptions: string[]
) => {
  return allOptions.filter(
    (option) =>
      !selectedItems.includes(option) &&
      option.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

export default useFilteredOptions;
