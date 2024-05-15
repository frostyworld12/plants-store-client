import * as suppliersService from "../services/suppliersService";
import * as userService from "../services/userService";
import { useEffect, useState } from "react";
import toast from 'react-hot-toast';

export const useSuppliers = (query, onSelect) => {
  const [isLoading, setIsLoading] = useState(false);
  const [suppliers, setSuppliers] = useState([]);

  const pageSize = 12;
  const [offset, setOffset] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const processSuppliers = async() => {
    setIsLoading(true);
    const result = await retrieveSuppliers(pageSize, offset, query);
    setIsLoading(false);

    setSuppliers(result?.suppliers || []);
    setTotalCount(result?.count || 0);
  };

  const handleSelectSupplier = (supplierId) => {
    const data = suppliers.find(supplier => supplier.id === supplierId) || {};
    onSelect(data);
  };

  const getSuppliersFormattedData = () => {
    return suppliers.map(item => ({id: item.id, image: item.image, title: item.name, description: item.contactPerson}));
  };

  useEffect(() => {
    processSuppliers();
  }, [offset, query]);

  return {
    isLoading,
    pageSize,
    setOffset,
    totalCount,
    processSuppliers,
    getSuppliersFormattedData,
    handleSelectSupplier
  }
};

export const useSuppliersProcess = (data = {}) => {
  const [supplierData, setSupplierData] = useState({});
  const [action, setAction] = useState('');

  const handleSupplierDataChange = (value, field) => {
    setSupplierData(data => ({...data, [field]: value}));
  };

  const handleSaveSupplier = async () => {
    const data = {
      name: supplierData.name,
      contactPerson: supplierData.contactPerson,
      email: supplierData.email,
      phone: supplierData.phone,
      user: {
        username: supplierData.username,
        password: supplierData.password
      }
    };
    await saveSupplier(data);
  };

  useEffect(() => {
    setSupplierData(data?.supplier || {});
    setAction(data?.action || '');
  }, []);

  return {
    action,
    supplierData,
    handleSupplierDataChange,
    handleSaveSupplier
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
    userService.saveUserData({...data, userType: 'supplier'});
    toast.success('Supplier successfully saved.');
  } catch (error) {
    toast.error(error.message || 'Unknown error');
  }
};

