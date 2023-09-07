import { Document } from 'mongoose';

export interface IMedicationInTreatment extends Document {
    medicamentId: string;
    schedule: string[];
    taken: boolean;
}
