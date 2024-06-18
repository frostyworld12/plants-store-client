import axios from 'axios';
import { fetchRoutes } from '../utility/constants';
import { getErrorMessage } from "../utility/helper";

export const fetchEntities = async (limit, offset, query = '', entity = '', additionalParams = {}) => {
  try {
    const route = fetchRoutes[entity];
    if (route) {
      let params = {};
      if (Object.keys(additionalParams).length) {
        params = {
          ...additionalParams
        };
      }

      params.limit = limit;
      params.offset = offset;
      params.query = query;

      const result = await axios.get(route, {
        params: params
      });

      return {
        ...result.data
      };
    }
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};