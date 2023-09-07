import { Document } from 'mongoose';

export interface IMedicament extends Document {
    form: string;
    substance: string;
    dosage?: string;
    description?: string;
}
