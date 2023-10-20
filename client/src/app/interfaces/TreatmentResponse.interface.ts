import { IMedicationInTreatment } from "./MedicationInTreatment.interface"

export interface ITreamentResponse {
    userId: string
    name: string
    medications: IMedicationInTreatment[]
    state: string
    strictnessLevel: string
    _id: string
}