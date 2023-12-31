import { Router } from 'express';
import {
    createTreatment, modifyTreatment, deleteTreatment, deleteMedicationFromTreatment,
    setMedicationSchedule, setStrictnessLevel, getTreatmentsByUserId, getAllTreatments,
     setTreatmentState, getMedicationsByTreatmentId, getTreatmentById
} from '../controllers/treatment.controller';

const router: Router = Router();

router.post('/treatments/create', createTreatment);
router.put('/treatments/edit/:id', modifyTreatment);
router.delete('/treatments/:id', deleteTreatment);
router.delete('/treatments/:treatmentId/medications/:medicationId', deleteMedicationFromTreatment);
router.put('/treatments/:treatmentId/medications/:medicationId', setMedicationSchedule);
router.put('/treatments/:id/strictness', setStrictnessLevel);
router.put('/treatments/:id/state', setTreatmentState);
router.get('/treatments', getTreatmentsByUserId);
router.get('/treatments/all', getAllTreatments);
router.get('/treatments/:id/medications', getMedicationsByTreatmentId);
router.get('/treatments/:id', getTreatmentById);

export default router;