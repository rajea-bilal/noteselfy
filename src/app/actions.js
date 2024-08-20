'use server';

import prisma from '@/lib/prisma';

export async function getRecentScreenshots(userId, limit = 5) {
  return prisma.screenshot.findMany({
    where: { clerkId: userId },
    orderBy: { createdAt: 'desc' },
    take: limit,
  });
}

export async function getTotalScreenshotsCount(userId) {
  return prisma.screenshot.count({
    where: { clerkId: userId },
  });
}

export async function getAllScreenshots(userId) {
  return prisma.screenshot.findMany({
    where: { clerkId: userId },
    orderBy: { createdAt: 'desc' },
  });
}

export async function getScreenshotById(id) {

  // converting id to a number
  const idNumber = Number(id)
  return prisma.screenshot.findUnique({
    where: { id: idNumber },
  });
}

// You can add other server actions here as well