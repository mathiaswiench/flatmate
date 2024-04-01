import type { Notification } from "../types/global";
import NotificationAction from "./notificationAction";

type NotificationInitialState = {
  notifications: Notification[];
  notify: (type: NotificationAction, message: string) => void;
};

export const notificationInitialState: NotificationInitialState = {
  notifications: [],
  notify: () => {
    return;
  },
};

const notificationReducer = (
  state = notificationInitialState,
  {
    type,
    payload,
  }: {
    type: NotificationAction;
    payload: { notification: Notification };
  }
): NotificationInitialState => {
  switch (type) {
    case NotificationAction.ADD:
      // Add notification to the list (state..notifications)
      return {
        ...state,
        notifications: [...state.notifications, payload.notification],
      };
    case NotificationAction.DELETE:
      // Remove/Delete notification
      const deleteNotifcation = state.notifications?.filter(
        (notification) => notification.id !== payload.notification.id
      );
      return { ...state, notifications: [...deleteNotifcation] };
    case NotificationAction.INACTIVE:
      // Make notifcation inactive
      const notifications = state.notifications?.map((notification) => {
        if (notification.id === payload.notification.id) {
          return {
            ...notification,
            active: false,
          };
        }
        return notification;
      });
      return { ...state, notifications: [...notifications] };
    default:
      return state;
  }
};

export default notificationReducer;
