import axios from 'axios';
import * as constants from '../utility/constants';
import { getErrorMessage } from "../utility/helper";

export const fetchNotifications = async (userId) => {
  try {
    const result = await axios.get(constants.getNotifications, {
      params: {
        userId: userId
      }
    });

    return result.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const readNotification = async (notificationId) => {
  try {
    await axios.post(constants.readNotification, notificationId);
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};