import mongoose, { Schema } from 'mongoose';
import { ITreatment } from '../interfaces/Treatment.interface';
import { IMedicationInTreatment } from '../interfaces/MedicationInTreatment.interface';

const MedicationInTreatmentSchema: Schema = new mongoose.Schema({
    medicamentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicament' },
    schedule: {
        type: [String],  // Array of hours
        validate: {
            validator: function(schedule: string[]) {
                return schedule.every(hour => /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(hour));
            },
            message: (props: { value: string[] }) => `${props.value} is not a valid hour format!`
        },
        required: [true, 'Schedule is required.']
    },
    taken: { type: Boolean, default: false }
});

const TreatmentSchema: Schema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    medications: {
        type: [MedicationInTreatmentSchema],
        validate: [(v: IMedicationInTreatment[]) => v.length > 0, 'A treatment must have at least one medicament.']
    },
    state: {
        type: String,
        enum: ['ongoing', 'finished'],
        default: 'ongoing'
    },
    strictnessLevel: {
        type: String,
        enum: ['low', 'medium', 'high'],
        required: [true, 'Strictness Level is required.']
    }
});

export default mongoose.model<ITreatment>('Treatment', TreatmentSchema);
