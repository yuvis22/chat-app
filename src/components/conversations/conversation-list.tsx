"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export const ConversationList = ({ conversations = [] }: { conversations: any[] }) => {
  const router = useRouter();
  const { id } = router.query;

  if (conversations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
        <p className="text-sm">No conversations yet</p>
        <Link href="/new-chat" className="text-sm underline mt-1">
          Start a new chat
        </Link>
      </div>
    );
  }

  // This is just placeholder data for UI demonstration
  // In a real app, this would come from the database
  const mockConversations = [
    {
      id: "1",
      name: "Sarah Johnson",
      lastMessage: "Are we still meeting tomorrow?",
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      unread: 2,
      online: true,
      imageUrl: null,
    },
    {
      id: "2",
      name: "Tech Team",
      lastMessage: "Alex: I'll push the changes tonight",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      unread: 0,
      online: false,
      isGroup: true,
      imageUrl: null,
    },
    {
      id: "3",
      name: "Michael Chang",
      lastMessage: "Thanks for your help!",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8),
      unread: 0,
      online: true,
      imageUrl: null,
    },
  ];

  return (
    <div className="space-y-2">
      {mockConversations.map((conversation) => (
        <Link 
          key={conversation.id} 
          href={`/chats/${conversation.id}`}
          className={cn(
            "flex items-center gap-3 rounded-md p-2 transition-colors hover:bg-accent",
            id === conversation.id && "bg-accent"
          )}
        >
          <div className="relative">
            <Avatar>
              <AvatarImage src="" />
              <AvatarFallback>
                {conversation.isGroup 
                  ? "GP" 
                  : conversation.name.split(" ").map(n => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            {conversation.online && !conversation.isGroup && (
              <span className="absolute right-0 bottom-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></span>
            )}
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <div className="flex justify-between items-baseline">
              <p className="text-sm font-medium truncate">
                {conversation.name}
              </p>
              <span className="text-xs text-muted-foreground">
                {format(conversation.timestamp, "HH:mm")}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-xs text-muted-foreground truncate pr-2">
                {conversation.lastMessage}
              </p>
              {conversation.unread > 0 && (
                <div className="flex-shrink-0 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-[10px] font-medium text-primary-foreground">
                    {conversation.unread}
                  </span>
                </div>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};