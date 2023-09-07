import { Router } from 'express';
import { createTreatment, modifyTreatment, deleteTreatment, deleteMedicationFromTreatment, setMedicationSchedule, setStrictnessLevel } from '../controllers/treatment.controller';

const router: Router = Router();

router.post('/treatments', createTreatment);
router.put('/treatments/:id', modifyTreatment);
router.delete('/treatments/:id', deleteTreatment);
router.delete('/treatments/:treatmentId/medications/:medicationId', deleteMedicationFromTreatment);
router.put('/treatments/:treatmentId/medications/:medicationId', setMedicationSchedule);
router.put('/treatments/:id/strictness', setStrictnessLevel);

export default router;