import * as React from "react";

export function DropdownMenu({ children }: { children: React.ReactNode }) {
  return <div className="relative inline-block text-left">{children}</div>;
}

export function DropdownMenuTrigger({
  children,
  asChild = false,
  ...props
}: {
  children: React.ReactNode;
  asChild?: boolean;
} & React.HTMLAttributes<HTMLElement>) {
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, props);
  }
  return (
    <button type="button" {...props}>
      {children}
    </button>
  );
}

export function DropdownMenuContent({
  children,
  align = "end",
  className = "",
  ...props
}: {
  children: React.ReactNode;
  align?: "start" | "end";
} & React.HTMLAttributes<HTMLDivElement>) {
  const alignClass =
    align === "start" ? "left-0 origin-top-left" : "right-0 origin-top-right";
  return (
    <div
      className={`absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none ${alignClass} ${className}`}
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="menu-button"
      tabIndex={-1}
      {...props}
    >
      <div className="py-1" role="none">
        {children}
      </div>
    </div>
  );
}

export function DropdownMenuItem({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer ${className}`}
      role="menuitem"
      tabIndex={-1}
      {...props}
    >
      {children}
    </div>
  );
}
