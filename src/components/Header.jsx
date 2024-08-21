'use client';

import { useUser, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import logoImage from '../../public/logo.png'
import Image from "next/image";

export default function Header() {
  // Get authentication status: isSignedIn (boolean for user's sign-in state) 
  // and isLoaded (boolean indicating if Clerk has finished initial auth check)
  const { isSignedIn, isLoaded } = useUser();

  return (
    <header className="p-6 bg-black ">
      <nav className="flex justify-between items-center container px-4">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 opacity-75 blur-lg rounded-full"></div>
          <Link href="/" className="block z-10 relative">
            <Image src={logoImage}
            alt="Logo" 
              width={48} 
              height={48} 
              className="w-16 h-16"/>
          </Link>
        </div>

      
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
                <Link href="/sign-in" className="cursor-pointer text-white text-opacity-60 hover:text-opacity-100 transition ">About</Link>
                <Link href="/sign-in" className="cursor-pointer text-white text-opacity-60 hover:text-opacity-100 transition"><button className="border border-text/70 py-2 px-4 rounded-lg">Sign In</button></Link>
                <Link href="/sign-up" className="cursor-pointer text-white transition"><button className="bg-white/70 py-2 px-4 rounded-lg text-black hover:bg-white ">Sign up</button></Link>
              </>
            )
          )}
        </div>

    
      </nav>
    </header>
  );
}