import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster"
import { twMerge } from "tailwind-merge"

import Header from '@/components/Header'
import { ClerkProvider} from "@clerk/nextjs";


const inter = Inter({ subsets: ["latin"], variable: '--font-sans' });


export const metadata = {
  title: "NoteSelfy",
  description: "Effortlessly upload screenshots/images, extract text, and generates smart categories using Open AI. Bringing words to life!",
   icons: {
    icon: '/logoCircular.png'
  }
};

export default function RootLayout({ children }) {
  return (
    
    <ClerkProvider>
      <html lang="en">
        <body 
        className={twMerge(
          inter.variable, 
          "bg-black text-orange-50 font-sans"
          )}
          >
            <Header />
              {children}
            <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
 
         
       
            

