import { AnimatePresence, motion } from 'framer-motion';
import React, { createContext, useContext, useReducer } from 'react';
import NotificationCard from '../components/NotificationCard/NotificationCard';
import notificationReducer from '../reducer/notificationReducer';
import { notificationInitialState } from '../reducer/notificationReducer';
import NotificationAction from '../reducer/notificationAction';
import type { Notification } from '../types/global';

export const NotificationContext = createContext(notificationInitialState);

const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(
    notificationReducer,
    notificationInitialState
  );

  const deleteNotifcation = (notification: Notification) => {
    dispatch({
      type: NotificationAction.DELETE,
      payload: {
        notification: notification,
      },
    });
  };

  const closeNotification = (notification: Notification) => {
    dispatch({
      type: NotificationAction.INACTIVE,
      payload: {
        notification: notification,
      },
    });
    setTimeout(() => {
      deleteNotifcation(notification);
    }, 1000);
  };

  const notify = (type: NotificationAction, message: string) => {
    console.log('called');
    const notificationId = Math.random().toString();
    const notification = {
      id: notificationId,
      type: type,
      message: message,
      active: true,
    };

    dispatch({
      type: NotificationAction.ADD,
      payload: {
        notification: notification,
      },
    });

    setTimeout(() => {
      closeNotification(notification);
    }, 2000);

    return notificationId;
  };

  const showNotifications = () => (
    <>
      {state.notifications.map((notification) => (
        <AnimatePresence key={notification?.id}>
          {notification?.active && (
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.8,
                y: '10%',
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: '0%',
              }}
              exit={{
                opacity: 0,
                scale: 0.8,
                y: '10%',
              }}
            >
              <NotificationCard
                type={notification?.type}
                message={notification?.message}
              />
            </motion.div>
          )}
        </AnimatePresence>
      ))}
    </>
  );
  const value = {
    notifications: state?.notifications,
    notify,
    closeNotification,
  };
  return (
    <>
      <NotificationContext.Provider value={value}>
        <div className='fixed left-0 top-0 z-50 flex h-fit w-full flex-col items-center justify-center gap-3 pt-10'>
          {showNotifications()}
        </div>
        {children}
      </NotificationContext.Provider>
    </>
  );
};

export function useNotificationContext() {
  const context = useContext(NotificationContext);

  if (context === undefined) {
    throw new Error('useNotification must be used within NotificationContext');
  }
  return context;
}

export default NotificationProvider;
