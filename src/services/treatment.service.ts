import Treatment from '../schemas/Treatment.schema';
import { ITreatment } from '../interfaces/Treatment.interface';
import Medicament from '../schemas/Medicament.schema';

export const createTreatment = async (treatmentData: ITreatment): Promise<ITreatment> => {
    try {
        // Check if medicamentIds in treatment exist in medicaments collection
        for (const medication of treatmentData.medications) {
            const medicamentExists = await Medicament.findById(medication.medicamentId);
            if (!medicamentExists) {
                throw new Error(`Medicament with ID ${medication.medicamentId} does not exist`);
            }
        }

        const treatment = new Treatment(treatmentData);
        return await treatment.save();
    } catch (error) {
        if (error instanceof Error) {
            throw new Error('Error while creating treatment: ' + error.message);
        } else {
            throw new Error('An unknown error occurred while creating treatment');
        }
    }
};

export const modifyTreatment = async (treatmentId: string, treatmentData: Partial<ITreatment>): Promise<ITreatment | null> => {
    try {
        return await Treatment.findByIdAndUpdate(treatmentId, treatmentData, { new: true });
    } catch (error) {
        if (error instanceof Error) {
            throw new Error('Error while modifying treatment: ' + error.message);
        } else {
            throw new Error('An unknown error occurred while modifying treatment');
        }
    }
};

export const deleteTreatment = async (treatmentId: string): Promise<ITreatment | null> => {
    try {
        return await Treatment.findByIdAndRemove(treatmentId);
    } catch (error) {
        if (error instanceof Error) {
            throw new Error('Error while deleting treatment: ' + error.message);
        } else {
            throw new Error('An unknown error occurred while deleting treatment')
        }
    }
};

export const deleteMedicationFromTreatment = async (treatmentId: string, medicationId: string): Promise<ITreatment | null> => {
    try {
        return await Treatment.findByIdAndUpdate(treatmentId, { $pull: { medications: { _id: medicationId } } }, { new: true });
    } catch (error) {
        if (error instanceof Error) {
            throw new Error('Error while deleting medication from treatment: ' + error.message);
        } else {
            throw new Error('An unknown error occurred while deleting a medicament from a treatment')
        }
    }
};

export const setMedicationSchedule = async (treatmentId: string, medicationId: string, schedule: string[]): Promise<ITreatment | null> => {
    try {
        return await Treatment.findOneAndUpdate({ '_id': treatmentId, 'medications._id': medicationId }, { 'medications.$.schedule': schedule }, { new: true });
    } catch (error) {
        if (error instanceof Error) {
            throw new Error('Error while setting medication schedule: ' + error.message);
        } else {
            throw new Error('An unknown error occurred while setting medication schedule')
        }
    }
};

export const setStrictnessLevel = async (treatmentId: string, level: 'low' | 'medium' | 'high'): Promise<ITreatment | null> => {
    try {
        return await Treatment.findByIdAndUpdate(treatmentId, { $set: { strictnessLevel: level } }, { new: true });
    } catch (error) {
        if (error instanceof Error) {
            throw new Error('Error while setting strictness level: ' + error.message);
        } else {
            throw new Error('An unknown error occurred while setting strictness level')
        }
    }
};