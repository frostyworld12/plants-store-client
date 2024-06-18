import { useEffect, useState } from "react";
import { useParamsData } from './useParamsData';
import * as productsService from "../services/productsService";
import toast from 'react-hot-toast';

export const useProducts = (query, isNeedUpdate, onSelect = () => { }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const pageSize = 24;
  const [totalCount, setTotalCount] = useState(0);

  const fetchProducts = async (offset = 0) => {
    setIsLoading(true);
    try {
      const result = await productsService.retrieveProducts(pageSize, offset, query);
      setProducts(result?.products || []);
      setTotalCount(result?.count || 0);
    } catch (error) {
      toast.error(error.message || 'Unknown error');
    }
    setIsLoading(false);
  };

  const getProductsFormattedData = () => {
    return products.map(item => ({ id: item.id, image: item.image, title: item.name, description: item.description }));
  };

  useParamsData((productId) => {
    const currentProduct = products.find(product => product.id === productId) || {};
    onSelect(currentProduct);
  }, 'productId', products.length);

  useEffect(() => {
    if (isNeedUpdate || query) {
      fetchProducts();
    }
  }, [query, isNeedUpdate]);

  return {
    isLoading,
    pageSize,
    totalCount,
    fetchProducts,
    getProductsFormattedData
  }
};

export const useProductsProcess = (data) => {
  const [productData, setProductData] = useState({});
  const [action, setAction] = useState('');

  const handleProductDataChange = (value, field) => {
    setProductData(data => ({ ...data, [field]: value }));
  };

  const handleProcessProduct = async (e) => {
    try {
      e.preventDefault();

      if (action !== 'remove') {
        await handleSaveProduct()
      } else {
        await handleRemoveProduct();
      }
    } catch (error) {
      toast.error(error.message || 'Unknown error');
    }
  }

  const handleSaveProduct = async () => {
    try {
      await productsService.saveProduct({
        ...productData,
        suppliers: (productData.suppliers || []).map(supplier => supplier.value)
      });
      toast.success('Product successfully saved.');
    } catch (error) {
      toast.error(error.message || 'Unknown error');
    }
  };

  const handleRemoveProduct = async () => {
    try {
      await productsService.deleteProduct(productData?.id);
      toast.success('Product successfully removed.');
    } catch (error) {
      toast.error(error.message || 'Unknown error');
    }
  };

  const getSuppliersFormattedData = (suppliers) => {
    return suppliers.map(supplier => ({
      label: supplier.name,
      value: supplier.id,
      description: supplier.contactPerson
    }));
  };

  const handleSelectSupplier = (suppliers) => {
    setProductData((data) => ({ ...data, suppliers: suppliers }));
  };

  const handleEditAction = () => {
    setAction('edit');
  };

  const handleRemoveAction = () => {
    setAction('remove');
  };

  useEffect(() => {
    setProductData({
      ...data.product,
      suppliers: getSuppliersFormattedData(data.product?.suppliers || []),
    });
    setAction(data?.action || '');
  }, [data]);

  return {
    action,
    productData,
    handleProductDataChange,
    handleProcessProduct,
    handleEditAction,
    handleRemoveAction,
    handleSelectSupplier
  };
};
