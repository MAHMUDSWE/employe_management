import { forwardRef } from "react";

export const Select = forwardRef(
  ({ className, placeholder, options = [], ...props }, ref) => {
    return (
      <div
        className={`${className} cursor-pointer focus-within:border-l-[2px] focus-within:border-l-black  w-full pr-2 bg-transparent border border-gray-200 rounded-sm focus:outline-gray-900`}
      >
        <select
          {...props}
          value={props.value || ""}
          className="w-full cursor-pointer focus:outline-none px-2 py-3  h-full bg-transparent"
          ref={ref}
        >
          <option disabled value="">
            {placeholder}
          </option>
          {options.map((option) => {
            return (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
);
