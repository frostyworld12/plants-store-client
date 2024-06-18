import axios from 'axios';
import * as constants from '../utility/constants';
import { getErrorMessage } from '../utility/helper';

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
    throw new Error(getErrorMessage(error));
  }
};