import { Router, Request, Response } from 'express';
import { z } from 'zod';
import prisma from '../../config/database';

const router = Router();

const slugify = (text: string): string => {
  const trMap: { [key: string]: string } = {
    'ç': 'c', 'Ç': 'C', 'ğ': 'g', 'Ğ': 'G',
    'ı': 'i', 'İ': 'I', 'ö': 'o', 'Ö': 'O',
    'ş': 's', 'Ş': 'S', 'ü': 'u', 'Ü': 'U',
  };
  return text.split('').map(char => trMap[char] || char).join('')
    .toLowerCase().trim().replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
};

const categorySchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  image: z.string().optional(),
  parentId: z.string().nullable().optional(),
  isActive: z.boolean().default(true),
  order: z.number().int().default(0),
});

// GET /api/admin/categories - List all
router.get('/', async (req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany({
      include: {
        parent: true,
        children: true,
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

// POST /api/admin/categories - Create
router.post('/', async (req: Request, res: Response) => {
  try {
    const validatedData = categorySchema.parse(req.body);

    let slug = slugify(validatedData.name);
    let counter = 1;
    while (await prisma.category.findUnique({ where: { slug } })) {
      slug = `${slugify(validatedData.name)}-${counter}`;
      counter++;
    }

    const category = await prisma.category.create({
      data: { ...validatedData, slug },
      include: { parent: true, children: true },
    });

    res.status(201).json(category);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors[0].message });
    }
    console.error('Create category error:', error);
    res.status(500).json({ error: 'Failed to create category' });
  }
});

// PUT /api/admin/categories/:id - Update
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const validatedData = categorySchema.partial().parse(req.body);

    const existing = await prisma.category.findUnique({
      where: { id: req.params.id },
    });

    if (!existing) {
      return res.status(404).json({ error: 'Category not found' });
    }

    let slug = existing.slug;
    if (validatedData.name && validatedData.name !== existing.name) {
      slug = slugify(validatedData.name);
      let counter = 1;
      while (
        await prisma.category.findFirst({
          where: { slug, id: { not: req.params.id } },
        })
      ) {
        slug = `${slugify(validatedData.name)}-${counter}`;
        counter++;
      }
    }

    const category = await prisma.category.update({
      where: { id: req.params.id },
      data: { ...validatedData, slug },
      include: { parent: true, children: true },
    });

    res.json(category);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors[0].message });
    }
    console.error('Update category error:', error);
    res.status(500).json({ error: 'Failed to update category' });
  }
});

// DELETE /api/admin/categories/:id - Delete
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const category = await prisma.category.findUnique({
      where: { id: req.params.id },
      include: { _count: { select: { products: true, children: true } } },
    });

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    if (category._count.products > 0) {
      return res.status(400).json({ error: 'Category has products' });
    }

    if (category._count.children > 0) {
      return res.status(400).json({ error: 'Category has sub-categories' });
    }

    await prisma.category.delete({ where: { id: req.params.id } });
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Delete category error:', error);
    res.status(500).json({ error: 'Failed to delete category' });
  }
});

export default router;
