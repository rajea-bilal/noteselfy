import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // Attempt to query the database
    const result = await prisma.$queryRaw`SELECT 1+1 AS result`;
    return NextResponse.json({ message: 'Database connected successfully', result });
  } catch (error) {
    console.error('Database connection error', error);
    return NextResponse.json({ error: 'Failed to connect to the database' }, { status: 500 });
  }
}