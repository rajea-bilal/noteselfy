"use server"

import { auth, currentUser } from '@clerk/nextjs/server';
import Link from 'next/link';
import { getRecentScreenshots, getTotalScreenshotsCount } from '@/app/actions';
import { Card, CardHeader, CardTitle, CardContent  } from "@/components/ui/card";
import { Activity, Sparkles, PartyPopper } from 'lucide-react'

export default async function DashboardPage() {

  try {
    const { userId } = auth();
     if (!userId) {
      return <div>Please log in to view the dashboard</div>;
    }
    // const user = await currentUser();
    //  if (!user) {
    //   return <div>Unable to fetch user data. Please try again.</div>;
    // }
    const recentScreenshots = await getRecentScreenshots(userId, 5);
    const totalScreenshots = await getTotalScreenshotsCount(userId);
    return (
      <div className="">
          <h1 className="text-4xl font-bold mb-8 md:text-5xl bg-gradient-to-r from-red-500 to-blue-500 text-transparent bg-clip-text [-webkit-background-clip:text]">Welcome to dashboard!</h1>
          
        
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
  
          {/* quick stats */}
            <Card x-chunk="dashboard-01-chunk-0" className="bg-[#18181a] text-white/90 border border-[#18181a]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Quick Stats
                </CardTitle>
                <Sparkles className="h-6 w-6 text-muted-foreground"/>
               
                
              </CardHeader>
              <CardContent>
                <div className="text-1xl lg:text-2xl font-bold">Total Screenshots: {totalScreenshots}</div>
                <div className="text-1xl lg:text-2xl  font-bold">Recent Uploads: {recentScreenshots.length}</div>
              </CardContent>
            </Card>
              
  
          {/* quick actions */}
            <Card x-chunk="dashboard-01-chunk-0" className="bg-[#18181a] text-white/90 border border-[#18181a]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Quick Actions
                </CardTitle>
                <Activity className="h-6 w-6 text-muted-foreground"/>
                
              </CardHeader>
              <CardContent>
                <div className="text-1xl md:text-2xl  font-bold">
                   <Link href="/dashboard/upload" className="btn btn-primary mb-2 block hover:text-white/20">
                      Upload New Screenshot
                  </Link>
                </div>
            
                <div className="text-1xl md:text-2xl  font-bold">
                  <Link href="/dashboard/gallery" className="btn btn-secondary block hover:text-white/20">
                      View All Screenshots
                  </Link>
                </div>
              </CardContent>
            </Card>
        
  
        </div>
  
        <div className="bg-black p-6 rounded-lg shadow border border-white/10">
          <h2 className="text-2xl font-semibold mb-4 text-white/90">Recent Screenshots</h2>
          {recentScreenshots.length > 0 ? (
            <ul className="space-y-2">
              {recentScreenshots.map(screenshot => (
                <li key={screenshot.id}>
                  <Link href={`/dashboard/screenshot/${screenshot.id}`} className="text-zinc-50/40 hover:underline text-sm">
                    {screenshot.category || `Screenshot ${screenshot.id}`} - {new Date(screenshot.createdAt).toLocaleDateString()}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>No recent screenshots. Why not upload one?</p>
          )}
        </div>
      </div>
    );
  } catch(error) {
    console.error('Error in DashboardPage:', error);
    return <div>An error occurred while loading the dashboard. Please try again later.</div>;
  }

}