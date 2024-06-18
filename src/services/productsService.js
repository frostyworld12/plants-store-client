import axios from 'axios';
import * as constants from '../utility/constants';
import { getErrorMessage } from "../utility/helper";

export const retrieveProducts = async (limit, offset, query = '') => {
  try {
    const result = await axios.get(constants.getProducts, {
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
    throw new Error(getErrorMessage(error));
  }
};

export const getProductsByIds = async (productIds = []) => {
  try {
    if (productIds.length) {
      const result = await axios.post(constants.getProductsByIds, {
        productIds: productIds
      });

      return {
        ...result.data
      };
    }
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const saveProduct = async (data) => {
  try {
    const result = await axios.post(constants.saveProduct, data);
    return result;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const deleteProduct = async (productId) => {
  try {
    const result = await axios.delete(constants.deleteProduct, {
      params: {
        productId: productId
      }
    });
    return result;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};