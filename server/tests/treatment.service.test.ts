import mongoose from 'mongoose';
import 'jest';
import {
    validateTreatmentData,
    createTreatment,
    modifyTreatment,
} from '../src/services/treatment.service';
import Treatment from '../src/schemas/Treatment.schema';
import Medicament from '../src/schemas/Medicament.schema';
import User from '../src/schemas/User.schema';
import { ITreatmentTest } from '../src/interfaces/TreatmentTest.interface';
import { ITreatment } from '../src/interfaces/Treatment.interface';

jest.mock('../src/schemas/Treatment.schema');
jest.mock('../src/schemas/Medicament.schema');
jest.mock('../src/schemas/User.schema');

const sampleTreatmentData: ITreatmentTest = {
    userId: new mongoose.Types.ObjectId().toString(),
    name: 'Test Treatment',
    medications: [
        {
            medicamentId: new mongoose.Types.ObjectId().toString(),
            schedule: ['09:00', '18:00'],
            taken: false,
            notificationsSent: []
        }
    ],
    state: 'ongoing',
    strictnessLevel: 'medium'
};

describe('Treatment Service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('validateTreatmentData', () => {
        it('should validate correct treatment data', async () => {
            (Medicament.findById as jest.Mock).mockResolvedValue({ _id: sampleTreatmentData.medications[0].medicamentId });
            (User.findById as jest.Mock).mockResolvedValue({ _id: sampleTreatmentData.userId });

            const result = await validateTreatmentData(sampleTreatmentData as ITreatment);
            expect(result).toEqual(sampleTreatmentData);
        });

        it('should throw an error for non-existent medicament', async () => {
            (Medicament.findById as jest.Mock).mockResolvedValue(null);

            await expect(validateTreatmentData(sampleTreatmentData as ITreatment)).rejects.toThrow('Medicament with ID');
        });
    });

    describe('createTreatment', () => {
        it('should create a treatment successfully', async () => {
            const mockSavedTreatment = { ...sampleTreatmentData, _id: new mongoose.Types.ObjectId().toString() };

            (Medicament.findById as jest.Mock).mockResolvedValue({ _id: sampleTreatmentData.medications[0].medicamentId });

            (User.findById as jest.Mock).mockResolvedValue({ _id: sampleTreatmentData.userId });

            (Treatment.prototype.save as jest.Mock).mockResolvedValue(mockSavedTreatment);

            (User.findByIdAndUpdate as jest.Mock).mockResolvedValue({});

            const result = await createTreatment(sampleTreatmentData as ITreatment);
            expect(result).toEqual(mockSavedTreatment);
        });
    });

    describe('modifyTreatment', () => {
        it('should modify a treatment successfully', async () => {
            const mockModifiedTreatment = { ...sampleTreatmentData, name: 'Modified Treatment' };

            (Medicament.findById as jest.Mock).mockResolvedValue({ _id: sampleTreatmentData.medications[0].medicamentId });

            (User.findById as jest.Mock).mockResolvedValue({ _id: sampleTreatmentData.userId });

            (Treatment.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockModifiedTreatment);

            const result = await modifyTreatment('someTreatmentId', mockModifiedTreatment as ITreatment);
            expect(result).toEqual(mockModifiedTreatment);
        });
    });

});