"use client";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useField } from "formik";
import { useState } from "react";

interface IProps {
  name: string;
  options: Array<{ label: string; value: string }>;
  placeholder?: string;
}

const SelectWithOther = (props: IProps) => {
  const [field, meta, helpers] = useField(props.name);
  const { value, touched, error } = meta;
  const { setValue } = helpers;
  console.log(field);
  const [isOtherSelected, setIsOtherSelected] = useState(value === "other");
  const [customValue, setCustomValue] = useState<string>(
    isOtherSelected ? value : ""
  );

  const handleValueChange = (val: string) => {
    if (val === "other") {
      setIsOtherSelected(true);
      setValue(customValue);
    } else {
      setIsOtherSelected(false);
      setValue(val);
    }
  };

  const handleCustomValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const customVal = event.target.value;
    setCustomValue(customVal);
    setValue(customVal);
  };

  return (
    <div>
      {props.placeholder && (
        <label className="text-xs text-gray-700">{props.placeholder}</label>
      )}
      <Select
        value={isOtherSelected ? "other" : value}
        onValueChange={handleValueChange}
      >
        <SelectTrigger
          className={`py-6 px-4 text-black ${
            touched && error ? "text-red-500" : ""
          }`}
        >
          <SelectValue placeholder={props.placeholder} />
        </SelectTrigger>
        <SelectContent
          className="max-h-60 overflow-y-auto scroll-m-2"
          onWheel={(e) => e.stopPropagation()} // Ensure mouse wheel scrolling works
        >
          <SelectGroup>
            <SelectLabel>{props.placeholder}</SelectLabel>
            {props.options.map((option, i) => (
              <SelectItem
                key={`${props.name}-option-${i}`}
                value={option.value}
                className="hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-200 focus:text-black"
              >
                {option.label}
              </SelectItem>
            ))}
            <SelectItem
              value="other"
              className="hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-200 focus:text-black"
            >
              Other
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      {isOtherSelected && (
        <Input
          className="mt-2"
          placeholder="Enter value"
          value={customValue}
          onChange={handleCustomValueChange}
        />
      )}
      {touched && error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default SelectWithOther;
