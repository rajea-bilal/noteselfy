'use client';

import { useUser, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from 'next/link';

export default function Header() {
  // Get authentication status: isSignedIn (boolean for user's sign-in state) 
  // and isLoaded (boolean indicating if Clerk has finished initial auth check)
  const { isSignedIn, isLoaded } = useUser();

  return (
    <header className="p-4 bg-gray-100">
      <nav className="flex justify-between items-center container">
        <Link href="/" className="text-2xl font-extrabold">
          NoteSelfy
        </Link>
      
        <div className="flex gap-4 items-center">
          {isLoaded && (
            isSignedIn ? (
              <UserButton  appearance={{
                  elements: {
                    avatarBox: "w-14 h-14"  // Increased size to 56x56 pixels
                  }
                }}/>
            ) : (
              <>
                <Link href="/sign-up"><Button variant="outline">Sign Up</Button></Link>
                <Link href="/sign-in"><Button>Sign In</Button></Link>
              </>
            )
          )}
        </div>
      </nav>
    </header>
  );
}