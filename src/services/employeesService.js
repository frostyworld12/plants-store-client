import axios from 'axios';
import * as constants from '../utility/constants';
import { getErrorMessage } from "../utility/helper";

export const retrieveEmployees = async (limit, offset, query = '') => {
  try {
    const result = await axios.get(constants.getEmployees, {
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

export const saveEmployee = async (data) => {
  try {
    const result = await axios.post(constants.saveEmployee, data);
    return result;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const deleteEmployee = async (userId) => {
  try {
    const result = await axios.delete(constants.deleteEmployee, {
      params: {
        userId: userId
      }
    });
    return result;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const getEmployee = async (employeeId) => {
  try {
    const result = await axios.get(constants.getEmployee, {
      params: {
        employeeId: employeeId
      }
    });
    return result.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}