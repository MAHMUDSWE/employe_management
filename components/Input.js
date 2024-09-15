import { forwardRef } from "react";

export const Input = forwardRef(({ className, ...props }, ref) => {
  return (
    <input
      {...props}
      ref={ref}
      className={`${className} p-2 w-full border border-gray-200 rounded-sm focus:outline-gray-900`}
    />
  );
});
