'use client';

import { useUser, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import logoImage from '../../public/logo.png'
import Image from "next/image";
import { useState } from 'react';
import { Menu, X } from 'lucide-react'

export default function Header() {
  // Get authentication status: isSignedIn (boolean for user's sign-in state) 
  // and isLoaded (boolean indicating if Clerk has finished initial auth check)
  const { isSignedIn, isLoaded } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
 
    const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="p-6 bg-black ">
     
      <div className="px-4 lg:px-6">
        <div className="py-4 flex items-center justify-between">
          {/* logo */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 opacity-75 blur-lg rounded-full"></div>
          <Link href="/" className="block z-10 relative">
            <Image src={logoImage}
            alt="Logo" 
              width={100} 
              height={100} 
              className="h-12 w-12 rounded-lg  backdrop-blur opacity-75"/>
          </Link>
          </div>
            {/* mobile view hamburger menu */}
            <div className="border border-white border-opacity-30 inline-flex h-10 w-10 justify-center items-center rounded-md sm:hidden" onClick={toggleMobileMenu}>
             {mobileMenuOpen ? <X className="cursor-pointer text-white"/> :  <Menu className="cursor-pointer text-white"/>}
            </div>

            {/* nav */}
            {/* sign-in/sign-up buttons */}
          <div className="hidden sm:flex gap-4 items-center ">
          {!isLoaded && <p>Loading...</p>} 
          
          {isLoaded && (
            isSignedIn ? (
              <UserButton  appearance={{
                  elements: {
                    avatarBox: "w-14 h-14"  // Increased size to 56x56 pixels
                  }
                }}/>
            ) : (
              <>
                <Link href="/about" className="cursor-pointer text-white/70 hover:text-white/100 transition border border-white/30 py-2 px-4 rounded-lg">About</Link>
                <Link href="/sign-in" className="cursor-pointer text-white/70  hover:text-white/100 transition"><button className="border border-white/30 py-2 px-4 rounded-lg">Sign In</button></Link>
                <Link href="/sign-up" className="cursor-pointer transition "><button className="bg-white/70 py-2 px-4 rounded-lg text-black hover:bg-white">Sign up</button></Link>
              </>
            )
          )}
        </div>

        </div>
        
          {/* mobile menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden mt-6 flex flex-col gap-4">
            <Link href="/about" className="bg-[#18181a] py-2 px-4 rounded-lg text-white/70 hover:text-white/20 text-center">About</Link>

            {/* if user is not signed in, show the buttons */}
            {!isSignedIn && (
              <>
                <Link href="/sign-in" className="bg-[#18181a] py-2 px-4 rounded-lg text-white/70 hover:text-white/20 text-center">Sign In</Link>
                <Link href="/sign-up" className="bg-[#18181a] py-2 px-4 rounded-lg text-white/70 hover:text-white/20 text-center">Sign up</Link>
              </>
            )}

            {/* if user is signed in, show the avatar */}
            {isSignedIn && (
              <div className="flex justify-center">
                <UserButton appearance={{
                  elements: {
                    avatarBox: "w-14 h-14"
                  }
                }}/>
              </div>
            )}
          </div>
        )}

      </div>
    </header>
  );
}
         

       

       

    
   