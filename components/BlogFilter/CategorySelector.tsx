import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const CategorySelector = () => {
  return (
    <Select>
      <SelectTrigger className=" w-full border-shadow">
        <SelectValue placeholder="Category" className="text-black" />
      </SelectTrigger>
      <SelectContent className="text-black">
        <SelectItem value="light">Light</SelectItem>
        <SelectItem value="dark">Dark</SelectItem>
        <SelectItem value="system">System</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default CategorySelector;
