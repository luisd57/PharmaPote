import { Router } from 'express';
import { createTreatment, modifyTreatment, deleteTreatment, deleteMedicationFromTreatment, setMedicationSchedule, setStrictnessLevel, getTreatments } from '../controllers/treatment.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router: Router = Router();

router.post('/treatments/create', createTreatment);
router.put('/treatments/:id', modifyTreatment);
router.delete('/treatments/:id', deleteTreatment);
router.delete('/treatments/:treatmentId/medications/:medicationId', deleteMedicationFromTreatment);
router.put('/treatments/:treatmentId/medications/:medicationId', setMedicationSchedule);
router.put('/treatments/:id/strictness', setStrictnessLevel);
router.get('/treatments', authenticate, getTreatments);

export default router;