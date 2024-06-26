import React from "react";

type props = {
  text: string;
  checked: boolean;
  disabled?: boolean;
  action: (param: boolean) => void;
};

const ToggleButton = ({ text, action, checked, disabled }: props) => {
  return (
    <div className="flex items-center justify-center gap-1">
      <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
        {text}
      </span>
      <label className="relative inline-flex items-center cursor-pointer ">
        <input
          disabled={disabled || false}
          type="checkbox"
          className="sr-only peer"
          onChange={(e) => {
            action(e.target.checked);
          }}
          checked={checked}
        />

        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4  rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
      </label>
    </div>
  );
};

export default ToggleButton;
