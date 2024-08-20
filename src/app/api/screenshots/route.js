import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server'

export async function GET(request) {
  try {
   

     const { userId } = auth()
    console.log('User ID from auth:', userId);
    
    if (!userId) {
      console.log('No user ID found, returning unauthorized error');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('Fetching screenshots for user:', userId);
    const screenshots = await prisma.screenshot.findMany({
      where: { clerkId: userId },
      orderBy: { createdAt: 'desc' },
    });

    console.log(`Fetched ${screenshots.length} screenshots`);

    return NextResponse.json(screenshots);

  } catch (error) {
    console.error('Error in screenshots API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch screenshots', details: error.message }, 
      { status: 500 }
    );
  }
}