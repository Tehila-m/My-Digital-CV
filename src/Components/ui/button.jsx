import * as React from "react";

export const Button = React.forwardRef(({ className = "", variant = "default", ...props }, ref) => {
  const variants = {
    default: "bg-slate-900 text-white hover:bg-slate-800",
    outline: "border border-slate-300 hover:bg-slate-100",
    ghost: "bg-transparent hover:bg-slate-100",
  };

  return (
    <button
      ref={ref}
      className={`px-4 py-2 rounded-md font-medium transition-all focus:outline-none 
        ${variants[variant]} ${className}`}
      {...props}
    />
  );
});
Button.displayName = "Button";
