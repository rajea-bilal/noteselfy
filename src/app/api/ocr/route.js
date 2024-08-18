import { NextResponse } from 'next/server';
import vision from '@google-cloud/vision';
import prisma from '@/lib/prisma';
import { categorizeText } from '@/lib/categorizeText'

export async function POST(request) {
  try {
    const { imageUrl, screenshotId } = await request.json();
    console.log('Processing:', imageUrl, screenshotId);

    // Creates a client
    const client = new vision.ImageAnnotatorClient();

    // Performs text detection on the image file
    const [result] = await client.textDetection(imageUrl);
    const detections = result.textAnnotations;
    const text = detections[0].description;
    
    // perform categorization
     const category = await categorizeText(text);
    console.log(category)

      if (!category) {
      throw new Error('Categorization failed');
    }
     
    // Update the screenshot record in the database with the extracted text
    const updatedScreenshot = await prisma.screenshot.update({
      where: { id: screenshotId },
      data: { 
        extractedText: text,
        category: category
      },
    });

    return NextResponse.json({ 
      message: 'OCR and categorization completed successfully',
      extractedText: text,
      category: category,
      screenshot: updatedScreenshot
    });
  } catch (error) {
    console.error('OCR error:', error);
    return NextResponse.json({ error: 'OCR processing failed', details: error.message }, { status: 500 });
  }
}