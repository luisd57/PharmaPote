import { Request, Response } from 'express';
import * as TreatmentService from '../services/treatment.service'
import Treatment from '../schemas/Treatment.schema';

export const createTreatment = async (req: Request, res: Response) => {
    try {
        const treatment = await TreatmentService.createTreatment(req.body);
        res.status(201).json(treatment);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).json({ message: 'Error creating treatment', details: error.message });
        } else {
            res.status(500).json({ message: 'Error creating treatment', details: 'An unknown error occurred' });
        }
    }

};

export const modifyTreatment = async (req: Request, res: Response) => {
    try {
        const treatment = await TreatmentService.modifyTreatment(req.params.id, req.body);
        if (treatment) {
            res.status(200).json(treatment);
        } else {
            res.status(404).json({ message: 'Treatment not found' });
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).json({ message: 'Error modifying treatment', details: error.message });
        } else {
            res.status(500).json({ message: 'Error modifying treatment', details: 'An unknown error occurred' });
        }
    }
};

export const deleteTreatment = async (req: Request, res: Response) => {
    try {
        const treatment = await TreatmentService.deleteTreatment(req.params.id);
        if (treatment) {
            res.status(200).json({ message: 'Treatment deleted successfully' });
        } else {
            res.status(404).json({ message: 'Treatment not found' });
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).json({ message: 'Error deleting treatment', details: error.message });
        } else {
            res.status(500).json({ message: 'Error deleting treatment', details: 'An unknown error occurred' });
        }
    }
};

export const deleteMedicationFromTreatment = async (req: Request, res: Response) => {
    try {
        const treatment = await TreatmentService.deleteMedicationFromTreatment(req.params.treatmentId, req.params.medicationId);
        if (treatment) {
            res.status(200).json(treatment);
        } else {
            res.status(404).json({ message: 'Medication not found in treatment' });
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).json({ message: 'Error deleting medication from treatment', details: error.message });
        } else {
            res.status(500).json({ message: 'Error deleting medication from treatment', details: 'An unknown error occurred' });
        }
    }
};

export const setMedicationSchedule = async (req: Request, res: Response) => {
    try {
        const treatment = await TreatmentService.setMedicationSchedule(req.params.treatmentId, req.params.medicationId, req.body.schedule);
        if (treatment) {
            res.status(200).json(treatment);
        } else {
            res.status(404).json({ message: 'Medication not found in treatment' });
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).json({ message: 'Error setting medication schedule', details: error.message });
        } else {
            res.status(500).json({ message: 'Error setting medication schedule', details: 'An unknown error occurred' });
        }
    }
};

export const setTreatmentState = async (req: Request, res: Response) => {
    try {
        const treatment = await TreatmentService.setTreatmentState(req.params.id, req.body.state);
        if (treatment) {
            res.status(200).json(treatment);
        } else {
            res.status(404).json({ message: 'Treatment not found' });

        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).json({ message: 'Error setting treatment state', details: error.message });
        } else {
            res.status(500).json({ message: 'Error setting treatment state', details: 'An unknown error occurred' });
        }
    }
};

export const setStrictnessLevel = async (req: Request, res: Response) => {
    try {
        const treatment = await TreatmentService.setStrictnessLevel(req.params.id, req.body.strictnessLevel);
        if (treatment) {
            res.status(200).json(treatment);
        } else {
            res.status(404).json({ message: 'Treatment not found' });
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).json({ message: 'Error setting strictness level', details: error.message });
        } else {
            res.status(500).json({ message: 'Error setting strictness level', details: 'An unknown error occurred' });
        }
    }
};

export const getTreatmentsByUserId = async (req: Request, res: Response) => {
    try {
        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        const userId = req.user._id;
        const treatments = await TreatmentService.getTreatmentsByUserId(userId);
        res.status(200).json(treatments);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).json({ message: 'Error fetching treatments', details: error.message });
        } else {
            res.status(500).json({ message: 'Error fetching treatments', details: 'An unknown error occurred' });
        }
    }
};

export const getAllTreatments = async (req: Request, res: Response) => {
    try {
        if (!req.user || !req.user._id || req.user.role !== 'admin') {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        const treatments = await TreatmentService.getAllTreatments();
        res.status(200).json(treatments);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).json({ message: 'Error fetching treatments', details: error.message });
        } else {
            res.status(500).json({ message: 'Error fetching treatments', details: 'An unknown error occurred' });
        }
    }
}

export const getMedicationsByTreatmentId = async (req: Request, res: Response) => {
    try {
        const treatmentId = req.params.id;
        const treatment = await Treatment.findById(treatmentId).populate('medications.medicamentId');

        if (!treatment) {
            return res.status(404).json({ message: 'Treatment not found' });
        }

        return res.status(200).json(treatment.medications);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export const getTreatmentById = async (req: Request, res: Response) => {
    try {
        const treatmentId = req.params.id;
        const treatment = await TreatmentService.getTreatmentById(treatmentId);

        if (!treatment) {
            return res.status(404).json({ message: 'Treatment not found' });
        }

        return res.status(200).json(treatment);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: 'Error fetching treatment', details: error.message });
        } else {
            res.status(500).json({ message: 'Error fetching treatment', details: 'An unknown error occurred' });
        }
    }
}