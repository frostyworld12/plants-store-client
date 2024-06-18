import * as suppliersService from "../services/suppliersService";
import { useEffect, useState } from "react";
import { useParamsData } from './useParamsData';
import toast from 'react-hot-toast';

export const useSuppliers = (query, onSelect) => {
  const pageSize = 24;

  const [isLoading, setIsLoading] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  const [offset, setOffset] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const processSuppliers = async () => {
    setIsLoading(true);
    try {
      const result = await suppliersService.retrieveSuppliers(pageSize, offset, query);
      setSuppliers(result?.suppliers || []);
      setTotalCount(result?.count || 0);
    } catch (error) {
      toast.error(error.message || 'Unknown error');
    }
    setIsLoading(false);
  };

  const getSuppliersFormattedData = () => {
    return suppliers.map(item => ({ id: item.id, image: item.image, title: item.name, description: item.contactPerson }));
  };

  useParamsData((supplierId) => {
    if (suppliers.length) {
      const data = suppliers.find(supplier => supplier.id === supplierId) || {};
      onSelect(data);
    }
  }, 'supplierId', suppliers.length);

  useEffect(() => {
    processSuppliers();
  }, [offset, query]);

  return {
    isLoading,
    pageSize,
    setOffset,
    totalCount,
    processSuppliers,
    getSuppliersFormattedData
  }
};

export const useSuppliersProcess = (data = {}) => {
  const [supplierData, setSupplierData] = useState({});
  const [action, setAction] = useState('');

  useEffect(() => {
    setSupplierData(data?.supplier || {});
    setAction(data?.action || '');
  }, [data]);

  return {
    action,
    supplierData,
  };
};

