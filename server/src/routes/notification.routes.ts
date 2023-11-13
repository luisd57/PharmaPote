import { Router } from 'express';
import { getUserNotifications, markAsSeen, getNotifications, markAllAsSeen } from '../controllers/notification.controller';

const router: Router = Router();

router.get('/notifications/:userId', getUserNotifications);
router.patch('/notifications/:notificationId/seen', markAsSeen);
router.get('/notifications/all', getNotifications);
router.put('/notifications/all/seen', markAllAsSeen);

export default router;
