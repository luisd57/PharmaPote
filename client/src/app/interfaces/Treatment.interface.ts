import { IMedicationInTreatment } from "./MedicationInTreatment.interface";

export interface ITreatment {
    _id?: string;
    userId: string;
    name: string;
    medications: IMedicationInTreatment[];
    state: 'ongoing' | 'finished';
    strictnessLevel: 'low' | 'medium' | 'high';
}
