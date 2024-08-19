
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs';

export async function GET(request) {
  try {
    // Get the authenticated user's ID using Clerk
    const { userId } = auth();
    console.log(userId)

    // If there's no authenticated user, return an unauthorized error
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get the Backend API User object when you need access to the user's information
    const userSignedIn = await currentUser()
    console.log(`userId from the screenshots route page page: ${userId}`)
    console.log(`userSignedIn from the screenshots route page page: ${userSignedIn}`)

    // Find the user in our database using the Clerk userId
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    // If we can't find the user in our database, return an error
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Use Prisma to query the database for screenshots belonging to this user
    const screenshots = await prisma.screenshot.findMany({
      where: { userId: user.id }, // Filter by the user's ID in our database
      orderBy: { createdAt: 'desc' }, // Order by creation date, newest first
      // You can add more options here as needed:
      // select: { ... } // To choose specific fields
      // take: 10, // To limit the number of results
      // skip: 0, // For pagination
    });

    console.log(screenshots)
    // Return the screenshots as a JSON response with a 200 OK status
    return NextResponse.json(screenshots);
  } catch (error) {
    // If an error occurs during the process
    console.error('Error fetching screenshots:', error);
    
    // Return an error response with a 500 Internal Server Error status
    return NextResponse.json(
      { error: 'Failed to fetch screenshots' }, 
      { status: 500 }
    );
  }
}