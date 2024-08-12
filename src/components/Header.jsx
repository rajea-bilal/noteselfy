'use client';

import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { LogOut  } from "lucide-react";

export default function Header() {
  const { isSignedIn, user } = useUser();

  return (
    <header className="p-4 bg-gray-100">
      <nav className="flex justify-between items-center container">
      <h1 className="text-2xl font-extrabold">NoteSelfy</h1>
      <div>
        {/* if user is signed in */}
        {isSignedIn ? (
          <div className="flex items-center gap-4">
            <span className="font-bold">Welcome, {user.firstName || user.username}!</span>
            <SignOutButton className="cursor-pointer">
             <LogOut />
            </SignOutButton>
          </div>
        ) : (
        // otherwise show sign out button
          <SignInButton mode="modal">
            <Button>Sign in</Button>
          </SignInButton>
        )}
      </div>
      </nav>
    </header>
  );
}
        