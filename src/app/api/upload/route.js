import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const clerkId = formData.get('userId');
    const userEmail = formData.get('userEmail');
    const username = formData.get('username');

    // console.log('Received clerkId:', clerkId);

    // console.log(`file: ${file}`)
    // console.log(`clerkId: ${clerkId}`)
    // console.log(`userEmail: ${userEmail}`)
    // console.log(`username: ${username}`)
    
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    if (!clerkId || !userEmail || !username) {
      return NextResponse.json({ error: 'User information is missing' }, { status: 400 });
    }

    // TODO: Implement actual file upload to a storage service
    
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Upload to Cloudinary
    const cloudinaryUpload = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream({ resource_type: 'auto'}, (error, result) => {
          if(error) reject(error)
          else resolve(result)
          }
        )
        uploadStream.end(buffer)
    })
    
   

    if (!cloudinaryUpload) {
      return NextResponse.json({ error: 'Failed to upload to Cloudinary' }, { status: 500 });
    }
    // TODO: In a real app, you'd get the user ID from the session



     // Ensure user exists
    let user = await prisma.user.findUnique({
      where: { clerkId: clerkId}
    });

    console.log('Query result:', user);
   
    if (!user) {
      // Create a new user if not found
      user = await prisma.user.create({
        data: {
          clerkId: clerkId,
          email: userEmail,
          username: username,
        },
      });
    }

    // Save the screenshot info to the database
    const screenshot = await prisma.screenshot.create({
      data: {
        publicId: cloudinaryUpload.public_id,
        imageUrl: cloudinaryUpload.secure_url,
        clerkId: clerkId,
      },
    });

    return NextResponse.json({ 
      message: 'File uploaded successfully', screenshot
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: error.message || 'File upload failed' }, { status: 500 });
  }
}