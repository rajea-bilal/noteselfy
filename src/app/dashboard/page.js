"use server"

import { auth, currentUser } from '@clerk/nextjs/server';
import Link from 'next/link';
import { getRecentScreenshots, getTotalScreenshotsCount } from '@/app/actions';
import { Card, CardHeader, CardTitle, CardContent  } from "@/components/ui/card";
import { Activity, Sparkles, PartyPopper } from 'lucide-react'

export default async function DashboardPage() {
  const { userId } = auth();
  const user = await currentUser();
  const recentScreenshots = await getRecentScreenshots(userId, 5);
  const totalScreenshots = await getTotalScreenshotsCount(userId);

  return (
    <div className="">
      <div className="text-3xl font-bold mb-6 flex items-center gap-4">
        <h1>Welcome, {user.firstName}!</h1>
        <PartyPopper className="h-6 w-6 text-muted-foreground" size={32} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

        {/* quick stats */}
          <Card x-chunk="dashboard-01-chunk-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Quick Stats
              </CardTitle>
              <Sparkles className="h-6 w-6 text-muted-foreground"/>
             
              
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Total Screenshots: {totalScreenshots}</div>
              <div className="text-2xl font-bold">Recent Uploads: {recentScreenshots.length}</div>
            </CardContent>
          </Card>
            

        {/* quick actions */}
          <Card x-chunk="dashboard-01-chunk-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Quick Actions
              </CardTitle>
              <Activity className="h-6 w-6 text-muted-foreground"/>
              
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                 <Link href="/dashboard/upload" className="btn btn-primary mb-2 block">
                    Upload New Screenshot
                </Link>
              </div>
          
              <div className="text-2xl font-bold">
                <Link href="/dashboard/gallery" className="btn btn-secondary block">
                    View All Screenshots
                </Link>
              </div>
            </CardContent>
          </Card>
      

      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Recent Screenshots</h2>
        {recentScreenshots.length > 0 ? (
          <ul className="space-y-2">
            {recentScreenshots.map(screenshot => (
              <li key={screenshot.id}>
                <Link href={`/dashboard/screenshot/${screenshot.id}`} className="text-blue-600 hover:underline">
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
}