import axios from 'axios';
import * as constants from '../utility/constants';
import { getErrorMessage } from '../utility/helper';

export const fetchSupplyRequests = async (
  limit = 0,
  offset = 0,
  employeeId = '',
  supplierId = '',
  isApprovedBySupplier,
  isApprovedByEmployee,
  isRequestToEmployee,
  isRequestToSupplier
) => {
  try {
    const result = await axios.get(constants.getSupplyRequests, {
      params: {
        limit: limit,
        offset: offset,
        employeeId: employeeId,
        supplierId: supplierId,
        isApprovedBySupplier: isApprovedBySupplier,
        isApprovedByEmployee: isApprovedByEmployee,
        isRequestToEmployee: isRequestToEmployee,
        isRequestToSupplier: isRequestToSupplier
      }
    });

    return result.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

export const saveSupplyRequest = async (supplierId, employeeId, documentData, documentName, requestItems = []) => {
  try {
    await axios.post(constants.saveSupplyRequest, {
      supplierId: supplierId,
      employeeId: employeeId,
      documentName: documentName,
      documentData: documentData,
      requestItems: requestItems
    });
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const signSupplyRequest = async (requestId, documentData, employeeId, supplierId) => {
  try {
    await axios.post(constants.signSupplyRequest, {
      requestId: requestId,
      supplierId: supplierId,
      employeeId: employeeId,
      documentData: documentData
    });
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const fetchRequestById = async (requestId) => {
  try {
    const result = await axios.get(constants.getSupplyRequestById, {
      params: {
        requestId: requestId
      }
    });

    return result.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const saveSupplierRequest = async (supplierId, employeeId, documentData, documentName, parentRequestId) => {
  try {
    await axios.post(constants.saveSupplierRequest, {
      supplierId: supplierId,
      employeeId: employeeId,
      documentName: documentName,
      documentData: documentData,
      parentRequestId: parentRequestId
    });
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};
