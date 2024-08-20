"use server"

import { auth } from '@clerk/nextjs/server';
import { getAllScreenshots } from '@/app/actions';
import ScreenshotCard from '@/components/ScreenshotCard';



export default async function GalleryPage() {
  const { userId } = auth();
  const screenshots = await getAllScreenshots(userId);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Screenshots</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {screenshots.map(screenshot => (
          <ScreenshotCard key={screenshot.id} screenshot={screenshot} />
        ))}
      </div>
    </div>
  );
}