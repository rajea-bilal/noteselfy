'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export default function ScreenshotCard({ screenshot }) {
  const date = new Date(screenshot.createdAt);
  const formattedDate = date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  return (
    <Link href={`/dashboard/screenshot/${screenshot.id}`} className="block">
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-0">
          <Image 
            src={screenshot.imageUrl} 
            alt={`Screenshot ${screenshot.id}`}
            width={300}
            height={200}
            className="w-full h-40 object-cover rounded-t-lg"
          />
        </CardContent>
        <CardFooter className="p-4">
          <p className="text-sm text-gray-600">{formattedDate}</p>
        </CardFooter>
      </Card>
    </Link>
  );
}