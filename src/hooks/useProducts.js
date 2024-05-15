import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as productsService from "../services/productsService";
import { retrieveAllSuppliers } from "../services/suppliersService";
import toast from 'react-hot-toast';

export const useProducts = (query, isNeedUpdate) => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState({});
  const [isProductDetailsVisible, setIsProductDetailsVisible] = useState(false);

  const pageSize = 4;
  const [offset, setOffset] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const processProducts = async () => {
    setIsLoading(true);
    const result = await retrieveProducts(pageSize, offset, query);
    setIsLoading(false);
    setProducts(result?.products || []);
    setTotalCount(result?.count || 0);
  };

  const handleProductDetails = (state) => {
    setIsProductDetailsVisible(state);
  };

  useEffect(() => {
    if (isNeedUpdate) {
      processProducts();
    }
  }, [offset, query, isNeedUpdate]);

  return {
    isLoading,
    products,
    currentProduct,
    setCurrentProduct,
    processProducts,
    pageSize,
    setOffset,
    totalCount,
    isProductDetailsVisible,
    handleProductDetails
  }
};

export const useProductsProcess = (data) => {
  const [productData, setProductData] = useState({});
  const [suppliers, setSuppliers] = useState([]);
  const [action, setAction] = useState('');

  const handleProductDataChange = (value, field) => {
    setProductData(data => ({ ...data, [field]: value }));
  };

  const handleSaveProduct = async () => {
    await saveEmployee(productData);
  };

  const handleRemoveProduct = async () => {
    await removeEmployee(productData);
  };

  const retrieveAllSuppliers = async (query) => {
    const result = await retrieveSuppliers(query);
    const suppliersData = result?.suppliers;
    if (suppliersData) {
      setSuppliers(suppliersData.map(supplier => ({
        value: supplier.id,
        label: supplier.name,
        additionalInfo: supplier.contactPerson
      })));
    }
  };

  const processProductData = (data) => {
    const suppliers = data.suppliers?.map(supplier => supplier.id) || [];
    data.suppliers = suppliers;
    setProductData(data);
  };

  useEffect(() => {
    processProductData(data?.product || {});
    setAction(data?.action || '');
    retrieveAllSuppliers();
  }, [data]);

  return {
    action,
    productData,
    suppliers,
    retrieveAllSuppliers,
    handleProductDataChange,
    handleSaveProduct,
    handleRemoveProduct
  };
};

export const useProductDetails = () => {
  const tabs = [
    'About',
    'Suppliers'
  ];

  const [selectedTab, setSelectedTab] = useState('About');
  const navigate = useNavigate();

  const handleSelectTab = (tab) => {
    setSelectedTab(tab);
  };

  const handleRedirectToSupplier = (supplierId) => {
    navigate(`/suppliers/${supplierId}`);
  };

  useEffect(() => {
    setSelectedTab('About');
  }, []);

  return {
    tabs,
    selectedTab,
    handleSelectTab,
    handleRedirectToSupplier
  }
}

const retrieveProducts = async (limit, offset, query) => {
  try {
    return await productsService.retrieveProducts(limit, offset, query);
  } catch (error) {
    toast.error(error.message || 'Unknown error');
  }
};

const saveEmployee = async (data) => {
  try {
    await productsService.saveProduct(data);
    toast.success('Product successfully saved.');
  } catch (error) {
    toast.error(error.message || 'Unknown error');
  }
};

const removeEmployee = async (data) => {
  try {
    await productsService.deleteProduct(data?.id);
    toast.success('Product successfully removed.');
  } catch (error) {
    toast.error(error.message || 'Unknown error');
  }
};

const retrieveSuppliers = async (query = '') => {
  try {
    return await retrieveAllSuppliers(query);
  } catch (error) {
    toast.error(error.message || 'Unknown error');
  }
}

