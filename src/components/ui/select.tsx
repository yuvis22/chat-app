import * as React from "react";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  className?: string;
  children: React.ReactNode;
}

export function Select({ className = "", children, ...props }: SelectProps) {
  return (
    <select
      className={`block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm ${className}`}
      {...props}
    >
      {children}
    </select>
  );
}

export function SelectTrigger({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`flex items-center border border-gray-300 rounded-md px-3 py-2 cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function SelectContent({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function SelectItem({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function SelectValue({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={`flex-1 text-left ${className}`} {...props}>
      {children}
    </span>
  );
}
