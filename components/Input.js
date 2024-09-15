import { forwardRef } from "react";

export const Input = forwardRef(({ className, ...props }, ref) => {
  return (
    <input
      {...props}
      ref={ref}
      className={`${className} focus:outline-none p-2 w-full border border-gray-200 focus:border-l-black focus:border-l-[2px] rounded-sm`}
    />
  );
});
