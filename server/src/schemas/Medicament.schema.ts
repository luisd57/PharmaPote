import mongoose, { Schema } from 'mongoose';
import { IMedicament } from '../interfaces/Medicament.interface';

const MedicamentSchema: Schema = new mongoose.Schema({
    form: { type: String },
    substance: { type: String },
    dosage: { type: String },
    description: { type: String }
});

export default mongoose.model<IMedicament>('Medicament', MedicamentSchema);
