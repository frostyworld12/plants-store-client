import { useEffect, useState } from "react";
import * as customerService from "../services/customersService";
import toast from 'react-hot-toast';

export const useCustomers = (query, isNeedUpdate) => {
  const [isLoading, setIsLoading] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [currentCustomer, setCurrentCustomer] = useState(null);

  const pageSize = 12;
  const [offset, setOffset] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const processCustomers = async() => {
    setIsLoading(true);
    const result = await retrieveCustomers(pageSize, offset, query);
    setIsLoading(false);
    setCustomers(result.suppliers);
    setTotalCount(result.count);
  };

  useEffect(() => {
    if (isNeedUpdate) {
      processCustomers();
    }
  }, [offset, query, isNeedUpdate]);

  return {
    isLoading,
    customers,
    currentCustomer,
    setCurrentCustomer,
    processCustomers,
    pageSize,
    setOffset,
    totalCount
  }
};

export const useCustomersProcess = (data) => {
  const [customerData, setCustomerData] = useState({});
  const [action, setAction] = useState('');

  const handleCustomerDataChange = (value, field) => {
    setCustomerData(data => ({...data, [field]: value}));
  };

  const handleSaveCustomer = async () => {
    await saveCustomer(customerData);
  };

  const handleRemoveCustomer = async () => {
    await removeCustomer(customerData);
  };

  useEffect(() => {
    console.log(data);
    setCustomerData(data?.customer || {});
    setAction(data?.action || '');
  }, [data]);

  return {
    action,
    customerData,
    handleCustomerDataChange,
    handleSaveCustomer,
    handleRemoveCustomer
  };
};

const retrieveCustomers = async(limit, offset, query) => {
  try {
    return await customerService.retrieveCustomers(limit, offset, query);
  } catch (error) {
    toast.error(error.message || 'Unknown error');
  }
};

const saveCustomer = async(data) => {
  try {
    await customerService.saveCustomer(data);
    toast.success('Customer successfully saved.');
  } catch (error) {
    toast.error(error.message || 'Unknown error');
  }
}

const removeCustomer = async(data) => {
  try {
    await customerService.deleteCustomer(data?.id);
    toast.success('Customer successfully removed.');
  } catch (error) {
    toast.error(error.message || 'Unknown error');
  }
}

