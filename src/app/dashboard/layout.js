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
    <div className="flex h-screen">
      <aside className="grid items-start px-2 text-sm font-medium lg:px-4 border rounded-md">
        <nav className="mt-5">
          <Link href="/dashboard" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-white/10 hover:text-white duration-300">
            <Home className="h-6 w-6" />
            Dashboard
          </Link>
          <Link href="/dashboard/upload" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-white/10 hover:text-white duration-300">
            <Upload className="h-6 w-6" />
            Upload Screenshot
          </Link>
          <Link href="/dashboard/gallery" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-white/10 hover:text-white duration-300">
            <Images className="h-6 w-6" />
            Gallery
          </Link>
        </nav>
      </aside>
      <main className="flex-1 overflow-x-hidden overflow-y-auto">
        <div className="container mx-auto px-6 py-8">
          {children}
        </div>
      </main>
    </div>
  );
}