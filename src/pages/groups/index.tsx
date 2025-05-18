import { SignedIn } from "@clerk/nextjs";
import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { PlusCircle, Users } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";

export default function GroupsPage() {
  // Mock data for demonstration
  const groups = [
    {
      id: "1",
      name: "Tech Team",
      lastMessage: {
        sender: "Alex",
        content: "I'll push the changes tonight",
        timestamp: new Date(Date.now() - 1000 * 60 * 30)
      },
      members: 5,
      unread: 2
    },
    {
      id: "2",
      name: "Product Discussion",
      lastMessage: {
        sender: "Jessica",
        content: "Let's schedule a call tomorrow",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3)
      },
      members: 8,
      unread: 0
    },
    {
      id: "3",
      name: "Marketing Campaign",
      lastMessage: {
        sender: "Emma",
        content: "The designs look great! I've shared them with the client.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24)
      },
      members: 4,
      unread: 0
    }
  ];

  return (
    <SignedIn>
      <MainLayout>
        <div className="h-full flex flex-col">
          <div className="p-4 border-b flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Groups</h1>
              <p className="text-sm text-muted-foreground">
                Your group conversations
              </p>
            </div>
            <Button asChild>
              <Link href="/new-chat?type=group">
                <PlusCircle className="mr-2 h-4 w-4" />
                New Group
              </Link>
            </Button>
          </div>

          {groups.length > 0 ? (
            <ScrollArea className="flex-1">
              <div className="p-4 space-y-2">
                {groups.map((group) => (
                  <Link
                    key={group.id}
                    href={`/chats/${group.id}`}
                    className="block rounded-lg border bg-card transition-colors hover:bg-accent"
                  >
                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start gap-4">
                          <Avatar className="h-12 w-12">
                            <AvatarFallback className="bg-primary text-primary-foreground">
                              {group.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center">
                              <h3 className="font-medium">{group.name}</h3>
                              {group.unread > 0 && (
                                <div className="ml-2 h-5 w-5 bg-primary rounded-full flex items-center justify-center">
                                  <span className="text-[10px] font-medium text-primary-foreground">
                                    {group.unread}
                                  </span>
                                </div>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {group.members} members
                            </p>
                            <div className="mt-1">
                              <p className="text-sm">
                                <span className="font-medium">{group.lastMessage.sender}:</span> {group.lastMessage.content}
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {format(group.lastMessage.timestamp, "MMM d, h:mm a")}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </ScrollArea>
          ) : (
            <div className="flex-1 flex items-center justify-center flex-col p-8">
              <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center mb-4">
                <Users className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-medium mb-2">No groups yet</h3>
              <p className="text-muted-foreground mb-4 text-center max-w-md">
                Create a group chat to collaborate with multiple people at once.
              </p>
              <Button asChild>
                <Link href="/new-chat?type=group">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create a new group
                </Link>
              </Button>
            </div>
          )}
        </div>
      </MainLayout>
    </SignedIn>
  );
}