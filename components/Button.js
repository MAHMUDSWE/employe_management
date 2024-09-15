import { forwardRef } from "react";

export const Button = forwardRef((props, ref) => {
  const variantClassname =
    {
      outline: "bg-white border border-black",
    }[props.variant] || "bg-black text-white";
  return (
    <button
      {...props}
      ref={ref}
      className={`cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-500 pl-3 pr-3 pt-2 ${props.className} rounded-sm pb-2 text-center ${variantClassname}`}
    >
      {props.children}
    </button>
  );
});
