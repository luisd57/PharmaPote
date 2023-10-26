import { Router } from 'express';
import { getMedicaments } from '../controllers/medicament.controller';

const router: Router = Router();

router.get('/medicaments', getMedicaments);

export default router;