// components/ScreenshotCard.js
import Image from 'next/image';

export default function ScreenshotCard({ screenshot }) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="relative h-48">
        <Image 
          src={screenshot.imageUrl} 
          alt="Screenshot" 
          layout="fill" 
          objectFit="cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">Category: {screenshot.category}</h3>
        <p className="text-sm text-gray-600 mb-4">
          {screenshot.extractedText.length > 100 
            ? `${screenshot.extractedText.substring(0, 100)}...` 
            : screenshot.extractedText}
        </p>
        <p className="text-xs text-gray-500">
          Uploaded on: {new Date(screenshot.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}