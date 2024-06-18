import axios from 'axios';
import * as constants from '../utility/constants';
import { getErrorMessage } from '../utility/helper';

export const saveUserData = (data) => {
  sessionStorage.setItem('user', JSON.stringify(data));
  window.dispatchEvent(new StorageEvent(
    'storage', { key: 'user', data }
  ));
};

export const getUserData = () => {
  const userData = sessionStorage.getItem('user');
  return userData ? JSON.parse(userData) : null;
};

export const removeUserData = () => {
  sessionStorage.removeItem('user');
  window.dispatchEvent(new StorageEvent('storage'));
}

export const createSupplierUser = async (data) => {
  try {
    const result = await axios.post(constants.createSupplierUser, data);
    console.log(result);
    if (result?.data && Object.keys(result?.data).length) {
      saveUserData(result.data);
    } else {
      throw new Error('Error when creating supplier');
    }
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const getUser = async (data) => {
  try {
    const result = await axios.post(constants.getUser, data);
    if (result?.data && Object.keys(result?.data).length) {
      saveUserData(result.data);
      return result.data;
    } else {
      throw new Error('Error while login!');
    }
  } catch (error) {
    console.log(error)
    throw new Error(getErrorMessage(error));
  }
};

export const getUserById = async (userId) => {
  try {
    const result = await axios.get(constants.getUserById, {
      params: {
        userId: userId
      }
    });
    if (result?.data && Object.keys(result?.data).length) {
      saveUserData(result.data);
      return result.data;
    }
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};