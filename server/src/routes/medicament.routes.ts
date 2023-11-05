import { Router } from 'express';
import { getMedicaments, getMedicamentById } from '../controllers/medicament.controller';

const router: Router = Router();

router.get('/medicaments', getMedicaments);
router.get('/medicaments/:id', getMedicamentById);

export default router;