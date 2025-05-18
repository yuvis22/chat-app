"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { SignedIn } from "@clerk/nextjs";
import { format } from "date-fns";
import { useSocket } from "@/components/providers/socket-provider";
import { MainLayout } from "@/components/layout/main-layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  MoreVertical,
  Send,
  Paperclip,
  Check,
  CheckCheck,
  Image as ImageIcon,
  File,
  XCircle,
  Phone,
  Video
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDropzone } from "react-dropzone";
import { MediaPreview } from "@/components/chat/media-preview";

export default function ChatPage() {
  const router = useRouter();
  const { id } = router.query;
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filePreview, setFilePreview] = useState<any>(null);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const { socket } = useSocket();

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const isImage = file.type.startsWith("image/");
      
      setFilePreview({
        file,
        preview: isImage ? URL.createObjectURL(file) : null,
        type: isImage ? "image" : "file",
        name: file.name
      });
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    noClick: true,
    noKeyboard: true
  });

  const sendMessage = () => {
    if ((!message.trim() && !filePreview) || isLoading) return;
    
    setIsLoading(true);
    
    // In a real app, we would upload the file to a server and get a URL
    const newMessage = {
      id: Date.now().toString(),
      content: message,
      senderId: "current-user-id", // Would come from authentication
      timestamp: new Date(),
      status: "sent",
      media: filePreview ? {
        type: filePreview.type,
        url: filePreview.preview || undefined,
        name: filePreview.name
      } : undefined
    };
    
    setMessages((prev) => [...prev, newMessage]);
    setMessage("");
    setFilePreview(null);
    setIsLoading(false);
    
    // Simulate message status changes
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id ? { ...msg, status: "delivered" } : msg
        )
      );
      
      setTimeout(() => {
        setMessages(prev => 
          prev.map(msg => 
            msg.id === newMessage.id ? { ...msg, status: "read" } : msg
          )
        );
      }, 2000);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Set up mock conversation data for demonstration
  useEffect(() => {
    // Simulate loading chat history
    const mockMessages = [
      {
        id: "1",
        content: "Hey there! How are you doing?",
        senderId: "other-user-id",
        timestamp: new Date(Date.now() - 1000 * 60 * 60),
        status: "read"
      },
      {
        id: "2",
        content: "I'm good, thanks for asking! Just working on that project we discussed.",
        senderId: "current-user-id",
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        status: "read"
      },
      {
        id: "3",
        content: "Great to hear! How's the progress going?",
        senderId: "other-user-id",
        timestamp: new Date(Date.now() - 1000 * 60 * 15),
        status: "read"
      },
      {
        id: "4",
        content: "Making good progress actually. Should be done by the end of the week.",
        senderId: "current-user-id",
        timestamp: new Date(Date.now() - 1000 * 60 * 10),
        status: "read"
      },
      {
        id: "5",
        content: "That's excellent news! Looking forward to seeing it.",
        senderId: "other-user-id",
        timestamp: new Date(Date.now() - 1000 * 60 * 5),
        status: "read"
      }
    ];
    
    setMessages(mockMessages);
  }, [id]);

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Mock conversation data
  const conversation = {
    id: id,
    name: "Sarah Johnson",
    online: true,
    lastSeen: new Date(),
    imageUrl: null
  };

  return (
    <SignedIn>
      <MainLayout>
        <div className="h-full flex flex-col">
          <div className="px-4 py-3 border-b flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src="" />
                <AvatarFallback>
                  {conversation.name.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-semibold">{conversation.name}</h2>
                <p className="text-xs text-muted-foreground">
                  {conversation.online ? (
                    <span className="text-green-500">Online</span>
                  ) : (
                    <>Last seen {format(conversation.lastSeen, "h:mm a")}</>
                  )}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Phone className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Video className="h-5 w-5" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View profile</DropdownMenuItem>
                  <DropdownMenuItem>Search in conversation</DropdownMenuItem>
                  <DropdownMenuItem>Mute notifications</DropdownMenuItem>
                  <DropdownMenuItem>Block user</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">Delete chat</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          <div 
            className="flex-1 p-4 overflow-y-auto"
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            {isDragActive && (
              <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
                <div className="p-8 rounded-lg bg-card border border-dashed border-primary flex flex-col items-center">
                  <ImageIcon className="h-12 w-12 text-primary mb-4" />
                  <p className="text-lg font-medium">Drop your file here</p>
                </div>
              </div>
            )}
            
            <ScrollArea className="h-full px-4 -mx-4">
              <div className="space-y-4 pb-4">
                {messages.map((msg) => {
                  const isSentByCurrentUser = msg.senderId === "current-user-id";
                  
                  return (
                    <div 
                      key={msg.id}
                      className={cn(
                        "flex",
                        isSentByCurrentUser ? "justify-end" : "justify-start"
                      )}
                    >
                      <div className={cn(
                        "max-w-[80%] md:max-w-[70%] rounded-lg p-3",
                        isSentByCurrentUser ? "bg-primary text-primary-foreground" : "bg-secondary"
                      )}>
                        {msg.media && (
                          <div className="mb-2">
                            {msg.media.type === "image" ? (
                              <div className="rounded-md overflow-hidden">
                                <img
                                  src={msg.media.url}
                                  alt="Image"
                                  className="max-w-full h-auto"
                                />
                              </div>
                            ) : (
                              <div className="flex items-center gap-2 p-2 bg-background/30 rounded-md">
                                <File className="h-5 w-5" />
                                <span className="text-sm truncate">{msg.media.name}</span>
                              </div>
                            )}
                          </div>
                        )}
                        
                        {msg.content && <p>{msg.content}</p>}
                        
                        <div className="flex justify-end items-center gap-1 mt-1">
                          <span className="text-[10px] opacity-70">
                            {format(new Date(msg.timestamp), "h:mm a")}
                          </span>
                          
                          {isSentByCurrentUser && (
                            <span>
                              {msg.status === "sent" && (
                                <Check className="h-3 w-3 opacity-70" />
                              )}
                              {msg.status === "delivered" && (
                                <CheckCheck className="h-3 w-3 opacity-70" />
                              )}
                              {msg.status === "read" && (
                                <CheckCheck className="h-3 w-3 text-blue-400" />
                              )}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div ref={scrollRef} />
              </div>
            </ScrollArea>
          </div>
          
          {filePreview && (
            <div className="px-4 py-2 border-t">
              <MediaPreview
                file={filePreview}
                onCancel={() => setFilePreview(null)}
              />
            </div>
          )}
          
          <div className="p-4 border-t">
            <div className="flex items-center gap-2">
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={() => document.getElementById('file-input')?.click()}
              >
                <Paperclip className="h-5 w-5" />
              </Button>
              <input
                id="file-input"
                type="file"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const isImage = file.type.startsWith("image/");
                    setFilePreview({
                      file,
                      preview: isImage ? URL.createObjectURL(file) : null,
                      type: isImage ? "image" : "file",
                      name: file.name
                    });
                  }
                }}
              />
              
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message..."
                className="rounded-full bg-secondary border-0"
              />
              
              <Button 
                type="button"
                size="icon"
                onClick={sendMessage}
                disabled={(!message.trim() && !filePreview) || isLoading}
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </MainLayout>
    </SignedIn>
  );
}