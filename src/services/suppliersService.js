import axios from 'axios';
import * as constants from '../utility/constants';

export const retrieveSuppliers = async (limit, offset, query = '') => {
  try {
    const result = await axios.get(constants.getSuppliers, {
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

export const retrieveAllSuppliers = async (query = '') => {
  try {
    const result = await axios.get(constants.getAllSuppliers, {
      params: {
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

export const saveSupplier = async (data) => {
  try {
    const result = await axios.post(constants.saveSupplier, data);
    return result;
  } catch (error) {
    throw new Error(error?.response?.data || 'Unknown error');
  }
};

export const deleteSupplier = async (supplierId) => {
  try {
    const result = await axios.delete(constants.deleteSupplier, {
      params: {
        supplierId: supplierId
      }
    });
    return result;
  } catch (error) {
    throw new Error(error?.response?.data || 'Unknown error');
  }
};

export const getSupplier = async (supplierId) => {
  try {
    const result = await axios.get(constants.getSupplier, {
      params: {
        supplierId: supplierId
      }
    });

    return result.data;
  } catch (error) {
    throw new Error(error?.response?.data || 'Unknown error');
  }
}