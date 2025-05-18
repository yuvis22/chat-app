import { SignedIn, useUser } from "@clerk/nextjs";
import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { PlusCircle, MessageSquare } from "lucide-react";
import Link from "next/link";

export default function ChatsPage() {
  const { user } = useUser();

  return (
    <SignedIn>
      <MainLayout>
        <div className="h-full flex flex-col">
          <div className="p-4 border-b flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Messages</h1>
              <p className="text-sm text-muted-foreground">
                Start or continue a conversation
              </p>
            </div>
            <Button asChild>
              <Link href="/new-chat">
                <PlusCircle className="mr-2 h-4 w-4" />
                New Chat
              </Link>
            </Button>
          </div>

          <div className="flex-1 flex items-center justify-center flex-col p-8">
            <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center mb-4">
              <MessageSquare className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-medium mb-2">No active chats</h3>
            <p className="text-muted-foreground mb-4 text-center max-w-md">
              You don't have any active conversations yet. Start a new chat with someone to begin messaging.
            </p>
            <Button asChild>
              <Link href="/new-chat">
                <PlusCircle className="mr-2 h-4 w-4" />
                Start a new conversation
              </Link>
            </Button>
          </div>
        </div>
      </MainLayout>
    </SignedIn>
  );
}