import * as React from "react";

export interface SeparatorProps extends React.HTMLAttributes<HTMLHRElement> {
  className?: string;
}

export const Separator = React.forwardRef<HTMLHRElement, SeparatorProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <hr
        ref={ref}
        className={`border-t border-gray-200 my-2 ${className}`}
        {...props}
      />
    );
  }
);

Separator.displayName = "Separator";
