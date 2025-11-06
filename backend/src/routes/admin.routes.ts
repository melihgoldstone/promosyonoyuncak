import { Router } from 'express';
import { authenticateToken, requireAdmin } from '../middleware/auth.middleware';
import adminProductRoutes from './admin/product.routes';
import adminCategoryRoutes from './admin/category.routes';

const router = Router();

// All admin routes require authentication and admin role
router.use(authenticateToken);
router.use(requireAdmin);

// Mount sub-routes
router.use('/products', adminProductRoutes);
router.use('/categories', adminCategoryRoutes);

export default router;
