import { Router, Request, Response } from 'express';
import prisma from '../config/database';

const router = Router();

// GET /api/categories - List categories
router.get('/', async (req: Request, res: Response) => {
  try {
    const { parentId, includeProducts } = req.query;

    const where: any = { isActive: true };

    if (parentId === 'null') {
      where.parentId = null;
    } else if (parentId) {
      where.parentId = parentId;
    }

    const categories = await prisma.category.findMany({
      where,
      include: {
        children: {
          where: { isActive: true },
          orderBy: { order: 'asc' },
        },
        ...(includeProducts === 'true' && {
          products: {
            where: { isActive: true },
            take: 10,
            orderBy: { createdAt: 'desc' },
          },
        }),
        _count: { select: { products: true } },
      },
      orderBy: { order: 'asc' },
    });

    res.json(categories);
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

export default router;
