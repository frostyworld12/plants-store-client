import { useEffect, useState } from 'react';
import { useSubscription } from 'react-stomp-hooks';
import * as notificationService from '../services/notificationService';
import toast from 'react-hot-toast';

export const useNotification = (currentUser) => {

  const urlPerNotificationType = {
    'Supply request': '/home/supplyrequest/',
    'Supply request approved': '/home/supplyrequest/',
    'Supply request from supplier': '/home/supplies/',
    'Supply request from supplier approved': '/home/supplies/',
  };

  const [user, setUser] = useState({});
  const [isNotificationsListVisible, setIsNotificationsListVisible] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const getNotifications = async () => {
    try {
      const user = currentUser?.user;

      if (user) {
        setUser(user);
        const result = await notificationService.fetchNotifications(user.id);
        if (result) {
          const notificationsResult = result.map(notification => ({
            id: notification.id,
            title: notification.notificationType,
            url: urlPerNotificationType[notification.notificationType] + notification.additionalInfo
          }));
          setNotifications(notificationsResult);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleReadNotification = async (notificationId) => {
    try {
      await notificationService.readNotification(notificationId);
      setIsNotificationsListVisible(false);
      await getNotifications();
    } catch (error) {
      toast.error(error.message);
    }
  };

  useSubscription(`/topic/notif/${user?.id}`, async () => {
    await getNotifications();
  });

  useEffect(() => {
    getNotifications();
  }, [currentUser]);

  return {
    notifications,
    isNotificationsListVisible,
    setIsNotificationsListVisible,
    handleReadNotification
  };
};