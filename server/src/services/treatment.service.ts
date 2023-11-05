import Treatment from '../schemas/Treatment.schema';
import { ITreatment } from '../interfaces/Treatment.interface';
import Medicament from '../schemas/Medicament.schema';
import User from '../schemas/User.schema';
import { ObjectId } from 'mongoose';


export const createTreatment = async (treatmentData: ITreatment): Promise<ITreatment> => {
    try {
        // Check if medicamentIds in treatment exist in medicaments collection
        for (const medication of treatmentData.medications) {
            const medicamentExists = await Medicament.findById(medication.medicamentId);
            if (!medicamentExists) {
                throw new Error(`Medicament with ID ${medication.medicamentId} does not exist`);
            }

            // Check if the schedule has at least one value and is in the "00:00" format
            const isValidTime = (hour: string) => /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(hour);

            if (!medication.schedule.length || !medication.schedule.every(isValidTime)) {
                throw new Error('Invalid schedule format or schedule is empty.');
            }

        }

        if (!treatmentData.userId) {
            throw new Error('User ID is required.');
        }

        const userExists = await User.findById(treatmentData.userId);
        if (!userExists) {
            throw new Error(`User with ID ${treatmentData.userId} does not exist`);
        }

        if (!treatmentData.name || treatmentData.name.length < 4) {
            throw new Error('Treatment name should be at least 4 characters long.');
        }

        const treatment = new Treatment(treatmentData);
        const savedTreatment = await treatment.save();

        await User.findByIdAndUpdate(treatmentData.userId, { $push: { treatments: savedTreatment._id } });

        return savedTreatment;
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

export const setTreatmentState = async (treatmentId: string, state: 'ongoing' | 'finished'): Promise<ITreatment | null> => {
    try {
        return await Treatment.findByIdAndUpdate(treatmentId, { $set: { state } }, { new: true });
    } catch (error) {
        if (error instanceof Error) {
            throw new Error('Error while setting state: ' + error.message);
        } else {
            throw new Error('An unknown error occurred while setting state')
        }
    }
}

export const getTreatmentsByUserId = async (userId: string | ObjectId): Promise<ITreatment[]> => {
    try {
        return await Treatment.find({ userId });
    } catch (error) {
        if (error instanceof Error) {
            throw new Error('Error while fetching treatments: ' + error.message);
        } else {
            throw new Error('An unknown error occurred while fetching treatments');
        }
    }
};

export const getAllTreatments = async (): Promise<ITreatment[]> => {
    try {
        return await Treatment.find();
    } catch (error) {
        if (error instanceof Error) {
            throw new Error('Error while fetching treatments: ' + error.message);
        } else {
            throw new Error('An unknown error occurred while fetching treatments');
        }
    }
};

export const getTreatmentById = async (treatmentId: string): Promise<ITreatment | null> => {
    try {
        return await Treatment.findById(treatmentId);
    } catch (error) {
        if (error instanceof Error) {
            throw new Error('Error while fetching treatment: ' + error.message);
        } else {
            throw new Error('An unknown error occurred while fetching treatment');
        }
    }
}