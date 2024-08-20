
'use client';

import { useState, useEffect } from 'react';
import ScreenshotCard from './ScreenshotCard';
import { Loader2 } from "lucide-react";

export default function DashboardContent() {

  const [screenshots, setScreenshots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchScreenshots() {
      try {
        const response = await fetch('/api/screenshots');
        if (!response.ok) {
          throw new Error('Failed to fetch screenshots');
        }
        const data = await response.json();
        console.log(`screenshots on the frontend ${data}`)
        setScreenshots(data);
      } catch (error) {
        console.error('Error fetching screenshots:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchScreenshots();
  }, []);

  if (loading) {
    return <Loader2 />
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {screenshots.map((screenshot) => (
        <ScreenshotCard key={screenshot.id} screenshot={screenshot} />
      ))}
    </div>
  );
}