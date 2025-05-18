import { SignedIn } from "@clerk/nextjs";
import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { Bell, Check } from "lucide-react";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function NotificationsPage() {
  // Mock data for demonstration
  const notifications = [
    {
      id: "1",
      type: "message",
      content: "Sarah Johnson sent you a message",
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      read: false,
      linkTo: "/chats/1",
      user: {
        name: "Sarah Johnson",
        imageUrl: null
      }
    },
    {
      id: "2",
      type: "group_invite",
      content: "Alex Rivera added you to Marketing Campaign",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
      read: false,
      linkTo: "/groups/3",
      user: {
        name: "Alex Rivera",
        imageUrl: null
      }
    },
    {
      id: "3",
      type: "message",
      content: "Michael Chang sent you a message",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
      read: true,
      linkTo: "/chats/3",
      user: {
        name: "Michael Chang",
        imageUrl: null
      }
    },
    {
      id: "4",
      type: "group_message",
      content: "New message in Tech Team",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
      read: true,
      linkTo: "/groups/1",
      user: {
        name: "Tech Team",
        imageUrl: null
      }
    }
  ];

  const unreadNotifications = notifications.filter(n => !n.read);

  return (
    <SignedIn>
      <MainLayout>
        <div className="h-full flex flex-col">
          <div className="p-4 border-b flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Notifications</h1>
              <p className="text-sm text-muted-foreground">
                Stay updated with messages and activity
              </p>
            </div>
            {unreadNotifications.length > 0 && (
              <Button variant="outline" size="sm">
                <Check className="mr-2 h-4 w-4" />
                Mark all as read
              </Button>
            )}
          </div>

          {notifications.length > 0 ? (
            <div className="flex-1 overflow-auto">
              <div className="p-4 space-y-2">
                {notifications.map((notification) => (
                  <Link
                    key={notification.id}
                    href={notification.linkTo}
                    className={cn(
                      "block rounded-lg border p-4 transition-colors hover:bg-accent",
                      !notification.read && "bg-primary/5 border-primary/20"
                    )}
                  >
                    <div className="flex items-start gap-4">
                      <Avatar>
                        <AvatarImage src="" />
                        <AvatarFallback>
                          {notification.user.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className={cn(
                          "text-sm",
                          !notification.read && "font-medium"
                        )}>
                          {notification.content}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {format(notification.timestamp, "MMM d, h:mm a")}
                        </p>
                      </div>
                      {!notification.read && (
                        <div className="h-2 w-2 bg-primary rounded-full"></div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center flex-col p-8">
              <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center mb-4">
                <Bell className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-medium mb-2">No notifications</h3>
              <p className="text-muted-foreground text-center">
                You don't have any notifications yet. When you receive messages or updates, they will appear here.
              </p>
            </div>
          )}
        </div>
      </MainLayout>
    </SignedIn>
  );
}