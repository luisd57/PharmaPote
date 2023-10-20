export interface IMedicationInTreatment {
    medicamentId: string;
    schedule: string[];
    taken: boolean;
    notificationsSent?: string[];
}
