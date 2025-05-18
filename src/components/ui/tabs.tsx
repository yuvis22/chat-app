import * as React from "react";

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  children: React.ReactNode;
}

const TabsContext = React.createContext<{
  value: string | undefined;
  onValueChange: ((value: string) => void) | undefined;
}>({ value: undefined, onValueChange: undefined });

export function Tabs({
  defaultValue,
  value,
  onValueChange,
  className = "",
  children,
  ...props
}: TabsProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const controlledValue = value !== undefined ? value : internalValue;

  const handleValueChange = (newValue: string) => {
    if (value === undefined) {
      setInternalValue(newValue);
    }
    onValueChange?.(newValue);
  };

  return (
    <TabsContext.Provider
      value={{ value: controlledValue, onValueChange: handleValueChange }}
    >
      <div className={className} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

export function TabsList({
  className = "",
  children,
  ...props
}: TabsListProps) {
  return (
    <div
      className={`flex items-center rounded-md bg-gray-100 p-1 ${className}`}
      role="tablist"
      {...props}
    >
      {children}
    </div>
  );
}

export interface TabsTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  className?: string;
  children: React.ReactNode;
}

export function TabsTrigger({
  value,
  className = "",
  children,
  ...props
}: TabsTriggerProps) {
  const context = React.useContext(TabsContext);
  const isActive = context.value === value;

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      data-state={isActive ? "active" : "inactive"}
      onClick={() => context.onValueChange?.(value)}
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  className?: string;
  children: React.ReactNode;
}

export function TabsContent({
  value,
  className = "",
  children,
  ...props
}: TabsContentProps) {
  const context = React.useContext(TabsContext);
  const isActive = context.value === value;

  if (!isActive) return null;

  return (
    <div
      className={`mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${className}`}
      role="tabpanel"
      data-state={isActive ? "active" : "inactive"}
      {...props}
    >
      {children}
    </div>
  );
}
