import axios from 'axios';
import * as constants from '../utility/constants';

export const retrieveCustomers = async (limit, offset, query = '') => {
  try {
    const result = await axios.get(constants.getCustomers, {
      params: {
        limit: limit,
        offset: offset,
        query: query
      }
    });

    return {
      ...result.data
    };
  } catch (error) {
    throw new Error(error?.response?.data || 'Unknown error');
  }
};

export const saveCustomer = async (data) => {
  try {
    const result = await axios.post(constants.saveCustomer, data);
    return result;
  } catch (error) {
    throw new Error(error?.response?.data || 'Unknown error');
  }
};

export const deleteCustomer = async (customerId) => {
  try {
    const result = await axios.delete(constants.deleteCustomer, {
      params: {
        customerId: customerId
      }
    });
    return result;
  } catch (error) {
    throw new Error(error?.response?.data || 'Unknown error');
  }
};