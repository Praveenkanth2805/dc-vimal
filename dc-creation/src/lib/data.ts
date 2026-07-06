import { prisma } from './prisma';

export async function getHomepageContent() {
  const content = await prisma.homepageContent.findFirst();
  if (!content) return null;
  return {
    ...content,
    whyChooseUs: content.whyChooseUs ? JSON.parse(content.whyChooseUs) : [],
    stats: content.stats ? JSON.parse(content.stats) : [],
  };
}

export async function getContactInfo() {
  const info = await prisma.contactInfo.findFirst();
  return info;
}

export async function getPortfolioImages(limit?: number, category?: string) {
  const where = category ? { category } : {};
  return prisma.portfolio.findMany({
    where,
    orderBy: { order: 'asc' },
    take: limit,
  });
}

export async function getAllVideos() {
  return prisma.video.findMany({ orderBy: { order: 'asc' } });
}

export async function getAllServices() {
  return prisma.service.findMany({ orderBy: { order: 'asc' } });
}

export async function getAllReviews() {
  return prisma.review.findMany({ orderBy: { createdAt: 'desc' } });
}

export async function getPhotoFramePrices() {
  return prisma.photoFramePrice.findMany({ orderBy: { id: 'asc' } });
}