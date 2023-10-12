export interface INotification {
    _id?: string;
    userId: string;
    treatmentId: string;
    medicationId: string;
    message: string;
    seen: boolean;
}
