import { MdSearch } from "react-icons/md";

const SearchInput = () => {
  return (
    <div className="flex items-center bg-transparent px-4 py-2 border-1 shadow-md rounded-lg h-fit lg:w-full">
      <MdSearch className="text-2xl text-gray-400" />
      <input
        className="outline-none ml-2 w-full"
        name="search"
        placeholder="Search"
        // onChange={handleSearch}
      />
    </div>
  );
};
export default SearchInput;
