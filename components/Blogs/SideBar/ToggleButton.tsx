"use client";
import { useState } from "react";

const ToggleSwitch = () => {
  const [enabled, setEnabled] = useState(false);
  const handleToggle = () => {
    setEnabled((prev) => {
      const newState = !prev;
      // console.log(newState ? "All Blogs" : "Yours Only");
      //   API call logic
      return newState;
    });
  };
  return (
    <label className="relative inline-block w-32 h-10">
      <input
        type="checkbox"
        checked={enabled}
        onChange={handleToggle}
        className="sr-only"
      />
      <div
        className={`border-1 border-border shadow-shadow text-white flex px-4 flex-col justify-center font-semibold w-full h-full rounded-full transition-all ease-in-out duration-200 ${
          enabled
            ? "bg-gradient-to-r from-fuchsia-500 to-cyan-500"
            : "bg-gray-500"
        }`}
      >
        {!enabled ? (
          <p className="w-fit self-end">All Blogs</p>
        ) : (
          <p>My Blogs</p>
        )}
      </div>
      <span
        className={`absolute left-1 top-1 w-8 h-8 bg-gradient-to-r from-teal-400 to-yellow-200 rounded-full drop-shadow-md transform transition-transform duration-200 ease-linear ${
          enabled ? "translate-x-22" : "translate-x-0"
        }`}
      ></span>
    </label>
  );
};

export default ToggleSwitch;
