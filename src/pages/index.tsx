import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";

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
            </div>
          </div>
        </MainLayout>
      </SignedIn>
      <SignedOut>
        <div className="h-screen flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Chat App</h1>
          <SignInButton>
            <Button>Sign In</Button>
          </SignInButton>
        </div>
      </SignedOut>
    </>
  );
}
