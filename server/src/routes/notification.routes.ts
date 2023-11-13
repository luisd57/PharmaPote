import { Router } from 'express';
import { getUserNotifications, markAsSeen, getNotifications } from '../controllers/notification.controller';

const router: Router = Router();

router.get('/notifications/:userId', getUserNotifications);
router.patch('/notifications/:notificationId/seen', markAsSeen);
router.get('/notifications/all', getNotifications);

export default router;
