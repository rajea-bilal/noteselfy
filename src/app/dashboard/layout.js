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
    <div className="h-screen w-screen flex justify-center">

      <section className="flex container gap-6 mt-8 rounded-lg border border-white/20 mb-[5rem] md:mx-2 py-6 ">
        <aside className="w-14 md:w-64 transition-all duration-300 text-sm x-lg:px-2 font-medium border-r border-white/20">
          <nav className="flex flex-col items-center gap-3 md:items-start">
            <Link href="/dashboard" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-white/10 hover:text-white duration-300">
              <Home className="h-6 w-6 " />
              <span className="hidden md:inline">Dashboard</span>
            </Link>
            <Link href="/dashboard/upload" className="flex items-center gap-3 rounded-lg px-3 py-1 text-muted-foreground transition-all hover:bg-white/10 hover:text-white duration-300 ">
              <Upload className="h-6 w-6" />
              <span className="hidden md:inline">Upload Screenshot</span>
            </Link>
            <Link href="/dashboard/gallery" className="flex items-center gap-3 rounded-lg px-3 py-1 text-muted-foreground transition-all hover:bg-white/10 hover:text-white duration-300">
              <Images className="h-6 w-6" />
              <span className="hidden md:inline">Gallery</span>
            </Link>
          </nav>
        </aside>
        <main className="overflow-x-auto overflow-y-auto">
            {children}
        </main>
      </section>

    </div>
  );
}
      

       