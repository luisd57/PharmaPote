import Treatment from '../schemas/Treatment.schema';
import Notification from '../schemas/Notification.schema';
import Medicament from '../schemas/Medicament.schema';
import moment from 'moment';
import { IMedicament } from '../interfaces/Medicament.interface';

export const sendMedicationNotifications = async (): Promise<number> => {
    const currentHour = moment().format("HH:mm");
    const treatments = await Treatment.find({
        "medications.schedule": currentHour,
        "medications.notificationsSent": { $ne: currentHour }
    });

    let notificationsSentCount = 0;

    for (const treatment of treatments) {
        for (const medication of treatment.medications) {
            if (medication.schedule.includes(currentHour) && (!medication.notificationsSent || !medication.notificationsSent.includes(currentHour))) {
                const medicament: IMedicament | null = await Medicament.findById(medication.medicamentId);
                const message = `It's time to take ${medicament?.substance} from treatment: ${treatment.name}`;
                const notification = new Notification({
                    userId: treatment.userId,
                    treatmentId: treatment._id,
                    medicationId: medication._id,
                    message: message
                });

                await notification.save();
                notificationsSentCount++;

                // Update the notificationsSent for the medication
                medication.notificationsSent = medication.notificationsSent || [];
                medication.notificationsSent.push(currentHour);
            }
        }
        await treatment.save();
    }

    return notificationsSentCount;
};

export const getNotificationsForUser = async (userId: string) => {
    return await Notification.find({ userId }).sort({ _id: -1 });  // sort by most recent
};


export const markNotificationAsSeen = async (notificationId: string) => {
    return await Notification.findByIdAndUpdate(notificationId, { seen: true }, { new: true });
};

export const getNotifications = async () => {
    return await Notification.find().sort({ _id: -1 });
}