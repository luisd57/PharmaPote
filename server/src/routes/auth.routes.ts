import { Router } from 'express';
import { register, login, logout, token, isAuthenticated, getCurrentUserRole } from '../controllers/auth.controller'

const router: Router = Router();

router.post('/auth/register', register);
router.post('/auth/login', login);
router.post('/auth/logout', logout);
router.post('/auth/token', token);
router.get('/auth/isAuthenticated', isAuthenticated);
router.get('/auth/getCurrentUserRole', getCurrentUserRole);

export default router;
