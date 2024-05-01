import { useEffect, useState } from "react";
import * as suppliersService from "../services/suppliersService";
import toast from 'react-hot-toast';

export const useSuppliers = (query, isNeedUpdate) => {
  const [isLoading, setIsLoading] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  const [currentSupplier, setCurrentSupplier] = useState(null);

  const pageSize = 12;
  const [offset, setOffset] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const processSuppliers = async() => {
    setIsLoading(true);
    const result = await retrieveSuppliers(pageSize, offset, query);
    setIsLoading(false);
    setSuppliers(result.suppliers);
    setTotalCount(result.count);
  };

  useEffect(() => {
    console.log('retrieve')
    if (isNeedUpdate) {
      console.log('retrieve is update')

      processSuppliers();
    }
  }, [offset, query, isNeedUpdate]);

  return {
    isLoading,
    suppliers,
    currentSupplier,
    setCurrentSupplier,
    processSuppliers,
    pageSize,
    setOffset,
    totalCount
  }
};

export const useSuppliersProcess = (data) => {
  const [supplierData, setSupplierData] = useState({});
  const [action, setAction] = useState('');

  const handleSupplierDataChange = (value, field) => {
    setSupplierData(data => ({...data, [field]: value}));
  };

  const handleSaveSupplier = async () => {
    await saveSupplier(supplierData);
  };

  const handleRemoveSupplier = async () => {
    await removeSupplier(supplierData);
  };

  useEffect(() => {
    console.log(data);
    setSupplierData(data?.supplier || {});
    setAction(data?.action || '');
  }, [data]);

  return {
    action,
    supplierData,
    handleSupplierDataChange,
    handleSaveSupplier,
    handleRemoveSupplier
  };
};

const retrieveSuppliers = async(limit, offset, query) => {
  try {
    return await suppliersService.retrieveSuppliers(limit, offset, query);
  } catch (error) {
    toast.error(error.message || 'Unknown error');
  }
};

const saveSupplier = async(data) => {
  try {
    await suppliersService.saveSupplier(data);
    toast.success('Supplier successfully saved.');
  } catch (error) {
    toast.error(error.message || 'Unknown error');
  }
}

const removeSupplier = async(data) => {
  try {
    await suppliersService.deleteSupplier(data?.id);
    toast.success('Supplier successfully removed.');
  } catch (error) {
    toast.error(error.message || 'Unknown error');
  }
}

