import { Document } from 'mongoose';
import { IUser } from './User.interface';
import { IMedicationInTreatment } from './MedicationInTreatment.interface';

export interface ITreatment extends Document {
    userId: IUser['_id'];
    name: string;
    medications: IMedicationInTreatment[];
    state: 'ongoing' | 'finished';
    strictnessLevel: 'low' | 'medium' | 'high';
}
