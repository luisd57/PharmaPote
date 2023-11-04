import { Router } from 'express';
import {
    createTreatment, modifyTreatment, deleteTreatment, deleteMedicationFromTreatment,
    setMedicationSchedule, setStrictnessLevel, getTreatmentsByUserId, getAllTreatments, setTreatmentState
} from '../controllers/treatment.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { adminCheck } from '../middlewares/adminCheck.middleware';

const router: Router = Router();

router.post('/treatments/create', createTreatment);
router.put('/treatments/:id', modifyTreatment);
router.delete('/treatments/:id', deleteTreatment);
router.delete('/treatments/:treatmentId/medications/:medicationId', deleteMedicationFromTreatment);
router.put('/treatments/:treatmentId/medications/:medicationId', setMedicationSchedule);
router.put('/treatments/:id/strictness', setStrictnessLevel);
router.put('/treatments/:id/state', setTreatmentState);
router.get('/treatments', authenticate, getTreatmentsByUserId);
router.get('/treatments/all', authenticate, adminCheck, getAllTreatments);

export default router;