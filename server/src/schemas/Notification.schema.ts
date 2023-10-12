import mongoose, { Schema } from 'mongoose';

const NotificationSchema: Schema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    treatmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Treatment',
        required: true
    },
    medicationId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    seen: {
        type: Boolean,
        default: false
    }
});

export default mongoose.model('Notification', NotificationSchema);
