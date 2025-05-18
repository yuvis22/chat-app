"use client";

import { useState } from "react";
import { SignedIn } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { MainLayout } from "@/components/layout/main-layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { ArrowLeft, Search, UserPlus, Users } from "lucide-react";

export default function NewChatPage() {
  const router = useRouter();
  const [chatType, setChatType] = useState<"individual" | "group">("individual");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [groupName, setGroupName] = useState("");
  
  // Mock user data for demonstration
  const users = [
    { id: "1", name: "Sarah Johnson", email: "sarah.j@example.com", online: true },
    { id: "2", name: "Michael Chang", email: "michael.c@example.com", online: false },
    { id: "3", name: "Alex Rivera", email: "alex.r@example.com", online: true },
    { id: "4", name: "Jessica Kim", email: "jessica.k@example.com", online: true },
    { id: "5", name: "David Parker", email: "david.p@example.com", online: false },
    { id: "6", name: "Olivia Wilson", email: "olivia.w@example.com", online: false },
    { id: "7", name: "Ethan Brown", email: "ethan.b@example.com", online: true },
    { id: "8", name: "Emma Davis", email: "emma.d@example.com", online: false },
  ];
  
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const toggleUserSelection = (userId: string) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };
  
  const createChat = () => {
    if (chatType === "individual" && selectedUsers.length === 1) {
      // Create individual chat
      const userId = selectedUsers[0];
      router.push(`/chats/${userId}`);
      return;
    }
    
    if (chatType === "group" && selectedUsers.length >= 2) {
      if (!groupName.trim()) {
        toast.error("Please enter a group name");
        return;
      }
      
      // Create group chat
      const groupId = Math.random().toString(36).substring(7);
      router.push(`/chats/${groupId}`);
      return;
    }
    
    if (selectedUsers.length === 0) {
      toast.error("Please select at least one user");
    } else if (chatType === "group" && selectedUsers.length < 2) {
      toast.error("Please select at least two users for a group chat");
    }
  };
  
  return (
    <SignedIn>
      <MainLayout>
        <div className="h-full flex flex-col">
          <div className="p-4 border-b flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              className="mr-2"
              onClick={() => router.back()}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">New Conversation</h1>
              <p className="text-sm text-muted-foreground">
                Start a new chat with friends or colleagues
              </p>
            </div>
          </div>
          
          <div className="p-4">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">
                  Chat Type
                </label>
                <Select 
                  value={chatType} 
                  onValueChange={(value) => setChatType(value as "individual" | "group")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select chat type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="individual">
                      <div className="flex items-center">
                        <UserPlus className="h-4 w-4 mr-2" />
                        <span>Individual Chat</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="group">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2" />
                        <span>Group Chat</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {chatType === "group" && (
                <div>
                  <label htmlFor="group-name" className="text-sm font-medium mb-1 block">
                    Group Name
                  </label>
                  <Input
                    id="group-name"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    placeholder="Enter group name"
                  />
                </div>
              )}
              
              <div>
                <label className="text-sm font-medium mb-1 block">
                  {chatType === "individual" 
                    ? "Select a person to chat with"
                    : "Add people to the group"}
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by name or email"
                    className="pl-10"
                  />
                </div>
              </div>
              
              {selectedUsers.length > 0 && (
                <div>
                  <label className="text-sm font-medium mb-1 block">
                    Selected ({selectedUsers.length})
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {selectedUsers.map(userId => {
                      const user = users.find(u => u.id === userId);
                      if (!user) return null;
                      
                      return (
                        <div 
                          key={userId}
                          className="flex items-center gap-2 bg-primary/10 rounded-full pl-1 pr-2 py-1"
                        >
                          <Avatar className="h-6 w-6">
                            <AvatarFallback>
                              {user.name.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{user.name}</span>
                          <button 
                            className="h-4 w-4 rounded-full bg-muted/50 flex items-center justify-center"
                            onClick={() => toggleUserSelection(userId)}
                          >
                            <span className="text-xs">×</span>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              
              <div className="bg-card rounded-md border">
                <ScrollArea className="h-[300px]">
                  <div className="px-4 py-2">
                    <h3 className="text-sm font-medium mb-2">
                      {chatType === "individual" 
                        ? "People"
                        : "Add people to the group"}
                    </h3>
                    <Separator className="mb-2" />
                    {filteredUsers.length === 0 ? (
                      <p className="text-sm text-muted-foreground py-4 text-center">
                        No users found
                      </p>
                    ) : (
                      <div className="space-y-2">
                        {filteredUsers.map(user => (
                          <div
                            key={user.id}
                            className="flex items-center justify-between p-2 rounded-md hover:bg-accent cursor-pointer"
                            onClick={() => toggleUserSelection(user.id)}
                          >
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarFallback>
                                  {user.name.split(" ").map(n => n[0]).join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{user.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {user.email}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {user.online && (
                                <span className="h-2 w-2 rounded-full bg-green-500"></span>
                              )}
                              <input
                                type="checkbox"
                                checked={selectedUsers.includes(user.id)}
                                onChange={() => {}}
                                className="h-4 w-4"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </div>
              
              <Button 
                onClick={createChat}
                disabled={
                  (chatType === "individual" && selectedUsers.length !== 1) ||
                  (chatType === "group" && (selectedUsers.length < 2 || !groupName.trim()))
                }
                className="w-full"
              >
                {chatType === "individual" 
                  ? "Start Conversation" 
                  : "Create Group Chat"}
              </Button>
            </div>
          </div>
        </div>
      </MainLayout>
    </SignedIn>
  );
}