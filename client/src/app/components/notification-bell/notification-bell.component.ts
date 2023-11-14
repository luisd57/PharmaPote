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
  showNotificationsPanel: boolean = false;

  constructor(private notificationService: NotificationService, private authService: AuthService) { }

  ngOnInit(): void {
    const refreshInterval = interval(30000);
    const userId = this.authService.getCurrentUser()?._id;

    this.fetchNotificationsSubscription = refreshInterval.pipe(
      startWith(0),
      switchMap(() => this.notificationService.getUserNotifications(userId))
    ).subscribe(allNotifications => {
      const unseenNotifications = allNotifications.filter(n => !n.seen).slice(0, 6);
      this.notifications = unseenNotifications;
      this.hasUnseenNotifications = unseenNotifications.length > 0;
    });
  }

  ngOnDestroy(): void {
    this.fetchNotificationsSubscription?.unsubscribe();
  }

  onBellClick(): void {
    this.toggleNotificationsPanel();
  }

  toggleNotificationsPanel(): void {
    this.showNotificationsPanel = !this.showNotificationsPanel;

    if (this.showNotificationsPanel) {
      this.markNotificationsAsSeen();
    }
  }

  markNotificationsAsSeen(): void {
    const userId = this.authService.getCurrentUser()?._id;
    if (userId && this.hasUnseenNotifications) {
      this.notificationService.markAllAsSeen(userId).subscribe(() => {
        this.notifications = this.notifications.filter(notification => !notification.seen);
      });
    }
  }

}
