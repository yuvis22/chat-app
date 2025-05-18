"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import {
  MessageSquare,
  Users,
  Settings,
  PlusCircle,
  Menu,
  X,
  Bell,
  Home,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ThemeToggle } from "@/src/components/theme-toggle";
import { ConversationList } from "@/src/components/conversations/conversation-list";

const routes = [
  {
    label: "Home",
    href: "/",
    icon: Home,
  },
  {
    label: "Chats",
    href: "/chats",
    icon: MessageSquare,
  },
  {
    label: "Groups",
    href: "/groups",
    icon: Users,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
  {
    label: "Notifications",
    href: "/notifications",
    icon: Bell,
  },
];

export const Sidebar = ({ conversations = [] }: { conversations?: any[] }) => {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const toggleMobileSidebar = () => {
    setMobileOpen(!mobileOpen);
  };

  const pathname = router.pathname;

  return (
    <>
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button variant="ghost" size="icon" onClick={toggleMobileSidebar}>
          {mobileOpen ? <X /> : <Menu />}
        </Button>
      </div>

      <div
        className={cn(
          "flex flex-col h-full bg-background border-r z-30 transition-all duration-300",
          collapsed ? "w-[80px]" : "w-[280px]",
          mobileOpen
            ? "fixed inset-y-0 left-0"
            : "-left-full md:left-0 md:relative"
        )}
      >
        <div className="px-4 py-4 flex items-center justify-between">
          <div
            className={cn(
              "flex items-center",
              collapsed && "justify-center w-full"
            )}
          >
            {!collapsed && (
              <Link href="/" className="text-xl font-bold">
                ChatApp
              </Link>
            )}
            {collapsed && (
              <Link href="/" className="text-xl font-bold">
                <MessageSquare />
              </Link>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="hidden md:flex"
          >
            <Menu />
          </Button>
        </div>
        <Separator />
        <ScrollArea className="flex-1 pt-4">
          <div className="mb-4 px-4">
            {routes.map((route) => (
              <Button
                key={route.href}
                variant={pathname === route.href ? "secondary" : "ghost"}
                className={cn(
                  "w-full font-medium mb-1 justify-start",
                  collapsed && "justify-center px-0"
                )}
                size={collapsed ? "icon" : "default"}
                asChild
              >
                <Link href={route.href}>
                  <route.icon
                    className={cn("mr-2 h-5 w-5", collapsed && "mr-0")}
                  />
                  {!collapsed && route.label}
                </Link>
              </Button>
            ))}
          </div>
          {!collapsed && (
            <>
              <div className="px-4 mb-2">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium">Conversations</h3>
                  <Button variant="ghost" size="icon" asChild>
                    <Link href="/new-chat">
                      <PlusCircle className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <ConversationList conversations={conversations} />
              </div>
            </>
          )}
        </ScrollArea>
        <div
          className={cn("p-4 flex items-center gap-4", collapsed && "flex-col")}
        >
          <UserButton afterSignOutUrl="/" />
          {!collapsed && <ThemeToggle />}
        </div>
      </div>
    </>
  );
};
