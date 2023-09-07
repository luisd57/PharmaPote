import { Router } from 'express';
import { register, login, logout, token, isAuthenticated } from '../controllers/auth.controller'

const router: Router = Router();

router.post('/auth/register', register);
router.post('/auth/login', login);
router.post('/auth/logout', logout);
router.post('/auth/token', token);
router.get('/auth/isAuthenticated', isAuthenticated);

export default router;
