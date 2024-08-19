

import { Button } from "@/components/ui/button";
import Link from 'next/link';


export default function Home() {
  return (
    <div className="border min-h-screen">
  
       <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white max-h-[40rem]">
          <div className="container mx-auto px-6 py-24 text-center">
            <h1 className="text-5xl font-bold mb-4">
              From Screenshots to Shareable Insights
            </h1>
              <p className="text-xl mb-8">
                 NoteSelfy: Transform Screenshots into Organized, Shareable Content with AI
              </p>
          <section className="flex justify-center items-center gap-4">
            <Link href="/sign-up"><Button>Sign Up</Button></Link>
              <Link href="/sign-in"><Button>Sign In</Button></Link>
          </section>
      </div>
    </div>

    </div>
  );
}

