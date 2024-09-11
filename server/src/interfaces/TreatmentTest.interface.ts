import { IMedicationInTreatmentTest } from "./MedicationInTreatmentTest.interface";

export interface ITreatmentTest {
    userId: string;
    name: string;
    medications: IMedicationInTreatmentTest[];
    state: 'ongoing' | 'finished';
    strictnessLevel: 'low' | 'medium' | 'high';
}