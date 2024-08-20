import { getScreenshotById } from '@/app/actions';
import Image from 'next/image';
import { Card, CardTitle, CardHeader, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { ArrowLeft } from 'lucide-react'


export default async function ScreenshotDetailPage({ params }) {
  const screenshot = await getScreenshotById(params.screenshotId);

  if (!screenshot) {
    return <div>Screenshot not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="flex justify-around border">
        <h1 className="text-2xl font-bold mb-6">Screenshot Details</h1>
        <ArrowLeft size={32} />
      </section>



       <Card className="w-[500px]">
        <CardHeader>
          <CardTitle className="mb-2">Category: {screenshot.category}</CardTitle>
          <Image 
            src={screenshot.imageUrl} 
            alt={`Screenshot ${screenshot.id}`}
            width={300}
            height={300}
            className="w-80 h-auto mb-4"
          />
        </CardHeader>
        <CardContent >
          <p className="text-lg font-medium leading-none mb-4">
              Extracted Text
          </p>
          <p className="text-md text-primary">
                    {screenshot.extractedText}
          </p>
          
        </CardContent>
        <CardFooter className="flex justify-between text-muted-foreground">
          Created: {new Date(screenshot.createdAt).toLocaleString()}
        </CardFooter>
      </Card>
    </div>
  );
}