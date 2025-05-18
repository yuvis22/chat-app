import { ReactNode } from "react";
import { Sidebar } from "@/components/layout/sidebar";

export const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-screen flex">
      <Sidebar />
      <main className="flex-1 overflow-hidden">{children}</main>
    </div>
  );
};
