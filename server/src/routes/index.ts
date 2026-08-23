import { Router } from 'express';
import healthRoutes from './health.routes';
import authRoutes from './auth.routes';

const router = Router();

// Mount route modules
router.use('/', healthRoutes);
router.use('/auth', authRoutes);

// Future route modules will be mounted here:
// router.use('/users', userRoutes);
// router.use('/prompts', promptRoutes);
// router.use('/categories', categoryRoutes);
// router.use('/orders', orderRoutes);
// router.use('/reviews', reviewRoutes);
// router.use('/admin', adminRoutes);

export default router;
