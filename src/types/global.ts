import type NotificationAction from '../reducer/notificationAction';

export interface Notification {
  id: string;
  type: NotificationAction;
  message: string;
  active: boolean;
}
