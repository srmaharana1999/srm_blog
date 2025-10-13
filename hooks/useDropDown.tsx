import { RefObject, useEffect, useState } from "react";

interface IDropdown {
  selectorRef: RefObject<HTMLDivElement | null>;
}
const useDropdown = ({ selectorRef }: IDropdown) => {
  const [dropDownOpen, setDropDownOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectorRef.current &&
        !selectorRef.current.contains(event.target as Node)
      ) {
        setDropDownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setDropDownOpen, selectorRef]);
  return { dropDownOpen, setDropDownOpen };
};

export default useDropdown;
