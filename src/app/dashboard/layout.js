import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Home, Upload, Images} from 'lucide-react'

export default async function DashboardLayout({ children }) {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  return (
    <div className="container flex h-screen justify-center mt-8 rounded-lg border border-white/20 mb-[5rem] md:mx-2 py-6 ">
      <aside className="w-16 md:w-64 transition-all duration-300 grid items-start text-sm x-lg:px-2 font-medium border-r border-white/20">
        <nav className="mt-5 flex flex-col items-center md:items-start">
          <Link href="/dashboard" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-white/10 hover:text-white duration-300">
            <Home className="h-6 w-6" />
            <span className="hidden md:inline">Dashboard</span>
          </Link>
          <Link href="/dashboard/upload" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-white/10 hover:text-white duration-300">
            <Upload className="h-6 w-6" />
            <span className="hidden md:inline">Upload Screenshot</span>
          </Link>
          <Link href="/dashboard/gallery" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-white/10 hover:text-white duration-300">
            <Images className="h-6 w-6" />
            <span className="hidden md:inline">Gallery</span>
          </Link>
        </nav>
      </aside>
      <main className="flex-1 overflow-x-hidden overflow-y-auto">
        <div className="px-6 py-8">
          {children}
        </div>
      </main>
    </div>
  );
}