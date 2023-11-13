import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, interval, startWith, switchMap } from 'rxjs';
import { INotification } from 'src/app/interfaces/Notification.interface';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-notification-bell',
  templateUrl: './notification-bell.component.html',
  styleUrls: ['./notification-bell.component.scss']
})
export class NotificationBellComponent implements OnInit, OnDestroy {
  notifications: INotification[] = [];
  hasUnseenNotifications: boolean = false;
  private fetchNotificationsSubscription?: Subscription;

  constructor(private notificationService: NotificationService, private authService: AuthService) { }

  ngOnInit(): void {
    const refreshInterval = interval(60000);
    const userId = this.authService.getCurrentUser()?._id;
    console.log("current userId: ", userId);

    this.fetchNotificationsSubscription = refreshInterval.pipe(
      startWith(0),
      switchMap(() => this.notificationService.getUserNotifications(userId))
    ).subscribe(notifications => {
      this.notifications = notifications;
      console.log("notifications: ", notifications)
      this.hasUnseenNotifications = notifications.some(notification => !notification.seen);
    });
  }

  ngOnDestroy(): void {
    this.fetchNotificationsSubscription?.unsubscribe();
  }
}
