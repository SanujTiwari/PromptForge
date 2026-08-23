import { Router } from 'express';
import healthRoutes from './health.routes';

const router = Router();

// Mount route modules
router.use('/', healthRoutes);

// Future routes will be mounted here:
// router.use('/auth', authRoutes);
// router.use('/users', userRoutes);
// router.use('/prompts', promptRoutes);
// router.use('/categories', categoryRoutes);
// router.use('/orders', orderRoutes);
// router.use('/reviews', reviewRoutes);
// router.use('/admin', adminRoutes);

export default router;
