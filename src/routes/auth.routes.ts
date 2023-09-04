import { Router } from 'express';
import { register, login, logout, token, isAuthenticated} from '../controllers/auth.controller'

const router: Router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/token', token);
router.get('/isAuthenticated', isAuthenticated);

export default router;
