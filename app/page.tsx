'use client';

import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { MainLayout } from "@/src/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { MessageSquare, Shield, UserPlus, Image, Bell } from "lucide-react";

export default function HomePage() {
  return (
    <>
      <SignedIn>
        <MainLayout>
          <div className="h-full flex flex-col items-center justify-center p-4 md:p-8">
            <div className="max-w-3xl w-full space-y-8 text-center">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                Welcome to Chat App
              </h1>
              <p className="text-lg text-muted-foreground">
                Connect with friends, create groups, and chat securely
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                <div className="bg-card rounded-lg p-6 shadow-sm transition-all hover:shadow-md">
                  <div className="flex justify-center">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <MessageSquare className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-lg font-medium mb-2">Private Messaging</h3>
                  <p className="text-sm text-muted-foreground">
                    Send private messages to friends with end-to-end encryption
                  </p>
                </div>
                
                <div className="bg-card rounded-lg p-6 shadow-sm transition-all hover:shadow-md">
                  <div className="flex justify-center">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <UserPlus className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-lg font-medium mb-2">Group Chats</h3>
                  <p className="text-sm text-muted-foreground">
                    Create groups with multiple people for team discussions
                  </p>
                </div>
                
                <div className="bg-card rounded-lg p-6 shadow-sm transition-all hover:shadow-md">
                  <div className="flex justify-center">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Image className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-lg font-medium mb-2">Media Sharing</h3>
                  <p className="text-sm text-muted-foreground">
                    Share photos, videos, and documents securely
                  </p>
                </div>
                
                <div className="bg-card rounded-lg p-6 shadow-sm transition-all hover:shadow-md">
                  <div className="flex justify-center">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Shield className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-lg font-medium mb-2">Secure Messaging</h3>
                  <p className="text-sm text-muted-foreground">
                    End-to-end encryption keeps your messages private
                  </p>
                </div>
              </div>
              
              <Button className="mt-8" size="lg" asChild>
                <a href="/chats">Start Chatting</a>
              </Button>
            </div>
          </div>
        </MainLayout>
      </SignedIn>
      
      <SignedOut>
        <div className="flex flex-col min-h-screen">
          <header className="border-b py-4">
            <div className="container flex justify-between items-center">
              <h1 className="text-2xl font-bold">ChatApp</h1>
              <SignInButton>
                <Button>Sign in</Button>
              </SignInButton>
            </div>
          </header>
          
          <main className="flex-1 flex items-center">
            <div className="container my-12 md:my-16">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                    Secure messaging for everyone
                  </h1>
                  <p className="text-xl text-muted-foreground">
                    Connect with friends and colleagues with end-to-end encrypted messaging. Share media and create group chats.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <SignInButton>
                      <Button size="lg">Get Started</Button>
                    </SignInButton>
                    <Button size="lg" variant="outline">Learn More</Button>
                  </div>
                  <div className="pt-4 flex items-center gap-4">
                    <div className="flex -space-x-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-8 w-8 rounded-full border-2 border-background bg-muted" />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Join thousands of users already on the platform
                    </p>
                  </div>
                </div>
                
                <div className="relative h-[420px] bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center p-8">
                  <div className="w-full max-w-[300px] mx-auto">
                    <div className="bg-background rounded-lg shadow-lg p-4 mb-4 ml-8">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="h-8 w-8 rounded-full bg-primary/20"></div>
                        <div>
                          <p className="text-sm font-medium">Sarah</p>
                        </div>
                      </div>
                      <p className="text-sm">Hey, are you free to chat?</p>
                      <p className="text-xs text-right text-muted-foreground mt-1">12:34 PM</p>
                    </div>
                    
                    <div className="bg-primary rounded-lg shadow-lg p-4 mb-4 mr-8">
                      <p className="text-sm text-primary-foreground">Yes, I'm available now!</p>
                      <p className="text-xs text-right text-primary-foreground/70 mt-1">12:35 PM</p>
                      <div className="flex justify-end mt-1">
                        <div className="flex items-center text-[10px] text-primary-foreground/70">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" fill="currentColor" />
                          </svg>
                          <span>Read</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-background rounded-lg shadow-lg p-4 ml-8">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="h-8 w-8 rounded-full bg-primary/20"></div>
                        <div>
                          <p className="text-sm font-medium">Sarah</p>
                        </div>
                      </div>
                      <p className="text-sm">Great! Let's discuss the project details.</p>
                      <p className="text-xs text-right text-muted-foreground mt-1">12:36 PM</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-24">
                <div className="text-center">
                  <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <MessageSquare className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Private Chat</h3>
                  <p className="text-sm text-muted-foreground">
                    One-to-one private conversations with anyone
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <UserPlus className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Group Chat</h3>
                  <p className="text-sm text-muted-foreground">
                    Create groups with multiple participants
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Encryption</h3>
                  <p className="text-sm text-muted-foreground">
                    End-to-end encrypted messages for security
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Bell className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Notifications</h3>
                  <p className="text-sm text-muted-foreground">
                    Get notified of new messages instantly
                  </p>
                </div>
              </div>
            </div>
          </main>
          
          <footer className="border-t py-6">
            <div className="container">
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">
                  © 2025 ChatApp. All rights reserved.
                </p>
                <div className="flex gap-4">
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Privacy
                  </a>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Terms
                  </a>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Contact
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </SignedOut>
    </>
  );
}