import { Router } from 'express';
import { currentUser, login, register } from '../controllers/auth.controller';
import { requireAuth } from '../middleware/auth.middleware';
import { asyncWrapper } from '../utils';

const router = Router();
router.post('/register', asyncWrapper(register));
router.post('/login', asyncWrapper(login));
router.post('/logout', (_req, res) => res.status(204).send());
router.get('/me', requireAuth, asyncWrapper(currentUser));

export default router;
