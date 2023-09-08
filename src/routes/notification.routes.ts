import { Router } from 'express';
import { sendMedicationNotifications, getNotifications, markAsSeen } from '../controllers/notification.controller';

const router: Router = Router();

router.get('/notifications', getNotifications);
router.patch('/notifications/:notificationId/seen', markAsSeen);

export default router;
