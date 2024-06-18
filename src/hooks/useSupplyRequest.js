import { useState, useEffect, useContext } from 'react';
import * as supplyRequestService from '../services/supplyRequestService';
import { generateSupplyDocument, signSupplyDocument, getFileFromString, getStringFromFile, generateSupplierSupplyDocument } from '../services/pdfDocumentService';
import { getUserData } from '../services/userService';
import { AuthContext } from '../utility/contexts';
import { useParamsData } from './useParamsData';
import toast from 'react-hot-toast';

export const useSupplyRequest = (query, isNeedUpdate, onSelect = () => { }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [requests, setRequests] = useState([]);

  const pageSize = 24;
  const [totalCount, setTotalCount] = useState(0);

  const currentUser = useContext(AuthContext);

  const fetchSupplyRequests = async (offset = 0) => {
    setIsLoading(true);
    try {
      const result = await supplyRequestService.fetchSupplyRequests(
        pageSize,
        offset,
        currentUser?.employee?.id,
        currentUser?.supplier?.id,
        query,
        null,
        false,
        true
      );
      setRequests(result?.requests || []);
      setTotalCount(result?.count || 0);
    } catch (error) {
      toast.error(error.message || 'Unknown error');
    }
    setIsLoading(false);
  };

  const handleSelectPage = (page) => {
    fetchSupplyRequests(page - 1);
  };

  const getRequestsFormattedData = () => {
    return requests.map(item => ({
      id: item.id,
      title: `${item?.supplier?.name} ${item.requestName}`,
      description: `${item.approvedBySupplier ? 'Approved' : 'Processing'}`
    }));
  };

  useParamsData(async (requestId) => {
    try {
      if (requestId) {
        const currentRequest = await supplyRequestService.fetchRequestById(requestId);
        onSelect(currentRequest);
      }
    } catch (error) {
      console.log(error);
    }
  }, 'requestId', requests.length);

  useEffect(() => {
    if (isNeedUpdate || !isNaN(+query)) {
      fetchSupplyRequests();
    }
  }, [query, isNeedUpdate]);

  return {
    isLoading,
    pageSize,
    totalCount,
    handleSelectPage,
    getRequestsFormattedData
  };
};

export const useSupplyRequestProcess = (data = {}, onClose = () => { }) => {
  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState([]);

  const [productsInfo, setProductsInfo] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);

  const [currentFile, setCurrentFile] = useState(null);
  const [isSigned, setIsSigned] = useState(false);
  const [isSignatureOpen, setIsSignatureOpen] = useState(false);

  const [action, setAction] = useState('view');

  const currentUser = useContext(AuthContext);

  const handleSelect = (entity, items) => {
    if (entity === 'suppliers') {
      setSuppliers(items);
    } else if (entity === 'products') {
      setProducts(items);
    }
  };

  const handleStep = async (e) => {
    e?.preventDefault();

    if (currentStep === 1) {
      if (suppliers.length !== 0 && products.length !== 0) {
        setCurrentStep(currentStep + 1);
        const currentProductsInfo = products.map(product => ({
          productId: product.value,
          name: product.label,
          quantity: '',
          costPerUnit: '',
          total: ''
        }));

        setProductsInfo(currentProductsInfo);
      } else {
        toast('Fill in all fields.');
      }
    } else if (currentStep === 2) {
      setCurrentStep(currentStep + 1);
      await generateDocument();
    } else if (currentStep === 3) {
      if (!isSigned) {
        toast('Sign the document first.');
        return;
      }

      if (action === 'new') {
        await saveSupplyRequest();
      } else if (action === 'sign') {
        await saveSignedSupplyDocument();
      }
      onClose(true);
    }
  };

  const handleProductInfoChange = (value, field, index) => {
    const currentProductsInfo = [...productsInfo];
    currentProductsInfo[index][field] = value;
    currentProductsInfo[index].total = currentProductsInfo[index].quantity * currentProductsInfo[index].costPerUnit;

    setProductsInfo(currentProductsInfo);
  };

  const handleSigning = async (sign) => {
    setIsSigned(!!sign);
    if (action === 'new') {
      await generateDocument(sign);
    } else if (action === 'sign') {
      const file = await signSupplyDocument(currentFile, sign);
      setCurrentFile(file);
    }
    setIsSignatureOpen(false);
  };

  const generateDocument = async (signUrl) => {
    const header = [['Product', 'Quantity', 'Cost per unit', 'Total']];
    const body = productsInfo.map(product => [product.name, product.quantity, product.costPerUnit, product.total]);

    if (currentUser?.employee) {
      const currentFile = await generateSupplyDocument(header, body, {
        supplier: suppliers[0].label,
        employeeName: currentUser.employee.firstName + ' ' + currentUser.employee.lastName,
        employeePosition: currentUser.employee.position
      }, signUrl);

      setCurrentFile(currentFile);
    }
  };

  const saveSupplyRequest = async () => {
    try {
      const currentEmployee = getUserData();
      if (suppliers.length && currentEmployee?.employee) {
        const documentData = await getStringFromFile(currentFile);
        await supplyRequestService.saveSupplyRequest(
          suppliers[0].value,
          currentEmployee.employee.id,
          documentData,
          currentFile.name,
          productsInfo
        );
        toast.success('Supply request successfully created!');
      }
    } catch (error) {
      toast.error(error.message || 'Unknown error');
    }
  };

  const saveSignedSupplyDocument = async () => {
    try {
      const documentString = await getStringFromFile(currentFile);
      await supplyRequestService.signSupplyRequest(
        data.request?.id,
        documentString,
        null,
        currentUser?.supplier.id,
      );
      toast.success('Supply request successfully approved!');
    } catch (error) {
      toast.error(error.message || 'Unknown error');
    }
  };

  const getFileFromRequest = async () => {
    if (data?.request?.documentData) {
      const result = await getFileFromString(data?.request?.documentData, data?.request?.documentName || 'document.pdf');
      setCurrentFile(result);
    }
  }

  useEffect(() => {
    getFileFromRequest();
    setAction(data.action);
    if (data.action === 'sign') {
      setCurrentStep(3);
    }
  }, [data]);

  return {
    suppliers,
    products,
    productsInfo,
    currentStep,
    currentFile,
    isSignatureOpen,
    action,
    setIsSignatureOpen,
    setCurrentStep,
    handleStep,
    handleSelect,
    handleProductInfoChange,
    handleSigning
  };
};

export const useSupplyRequestSupplier = (query, isNeedUpdate, onSelect = () => { }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [requests, setRequests] = useState([]);

  const pageSize = 24;
  const [totalCount, setTotalCount] = useState(0);

  const currentUser = useContext(AuthContext);

  const fetchSupplyRequests = async (offset = 0) => {
    setIsLoading(true);
    try {
      const result = await supplyRequestService.fetchSupplyRequests(
        pageSize,
        offset,
        currentUser?.employee?.id,
        currentUser?.supplier?.id,
        null,
        query,
        true,
        false
      );
      setRequests(result?.requests || []);
      setTotalCount(result?.count || 0);
    } catch (error) {
      toast.error(error.message || 'Unknown error');
    }
    setIsLoading(false);
  };

  const handleSelectPage = (page) => {
    fetchSupplyRequests(page - 1);
  };

  const getRequestsFormattedData = () => {
    return requests.map(item => ({
      id: item.id,
      title: `${item?.supplier?.name} ${item.requestName}`,
      description: `${item.approvedByEmployee ? 'Approved' : 'Processing'}`
    }));
  };

  useParamsData(async (requestId) => {
    try {
      if (requestId) {
        const currentRequest = await supplyRequestService.fetchRequestById(requestId);
        onSelect(currentRequest);
      }
    } catch (error) {
      console.log(error);
    }
  }, 'requestId', requests.length);

  useEffect(() => {
    if (isNeedUpdate || !isNaN(+query)) {
      fetchSupplyRequests();
    }
  }, [query, isNeedUpdate]);

  return {
    isLoading,
    pageSize,
    totalCount,
    handleSelectPage,
    getRequestsFormattedData
  };
};

export const useSupplyRequestSupplierProcess = (data = {}, onClose = () => { }) => {
  const [request, setRequest] = useState([]);
  const [requestData, setRequestData] = useState({});

  const [currentFile, setCurrentFile] = useState(null);
  const [newFile, setNewFile] = useState(null);

  const [isSignatureOpen, setIsSignatureOpen] = useState(false);
  const [isSigned, setIsSigned] = useState(false);

  const [currentStep, setCurrentStep] = useState(1);
  const [action, setAction] = useState('view');

  const currentUser = useContext(AuthContext);

  const handleSelect = (items) => {
    setRequest(items);
  };

  const handleStep = async (e) => {
    e?.preventDefault();

    if (currentStep === 1) {
      if (request.length > 0) {
        await getCurrentRequest();
        setCurrentStep(currentStep + 1);
      } else {
        toast('Select request first.');
      }
    } else if (currentStep === 2) {
      setCurrentStep(currentStep + 1);
      await generateDocument();
    } else if (currentStep === 3) {
      if (!isSigned) {
        toast('Sign the document first.');
        return;
      }

      if (action === 'new') {
        await saveSupplierRequest();
      } else if (action === 'sign') {
        await saveSignedSupplyDocument();
      }

      onClose(true);
    }
  };

  const getCurrentRequest = async () => {
    try {
      const result = await supplyRequestService.fetchRequestById(request[0].value);
      if (result) {
        const file = await getFileFromString(result.documentData, result.documentName);
        setCurrentFile(file);
        setRequestData(result);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const generateDocument = async (signUrl) => {
    const header = [['Product', 'Quantity', 'Cost per unit', 'Total']];
    const body = requestData?.requestItems.map(item => [item.productName, item.quantity, item.costPerUnit, item.total]);

    const document = await generateSupplierSupplyDocument(
      header,
      body,
      {
        supplierName: requestData?.supplier?.name || '',
        supplierEmail: requestData?.supplier?.email || '',
        supplierPhone: requestData?.supplier?.phone || '',
        employeeName: (requestData?.employee?.firstName || '') + ' ' + (requestData?.employee?.lastName || '')
      },
      signUrl
    );
    setNewFile(document);
  };

  const handleSigning = async (sign) => {
    setIsSigned(!!sign);
    if (action === 'new') {
      await generateDocument(sign);
    } else if (action === 'sign') {
      console.log(newFile);
      const file = await signSupplyDocument(newFile, sign);
      setNewFile(file);
    }
    setIsSignatureOpen(false);
  };

  const saveSignedSupplyDocument = async () => {
    try {
      const documentString = await getStringFromFile(newFile);
      await supplyRequestService.signSupplyRequest(
        data.request?.id,
        documentString,
        currentUser?.employee?.id,
        null
      );
      toast.success('Supply request successfully approved!');
    } catch (error) {
      toast.error(error.message || 'Unknown error');
    }
  };

  const saveSupplierRequest = async () => {
    try {
      if (requestData && request.length && currentUser?.supplier) {
        const documentData = await getStringFromFile(newFile);
        await supplyRequestService.saveSupplierRequest(
          currentUser.supplier.id,
          requestData?.employee?.id,
          documentData,
          currentFile.name,
          request[0].value
        );
        toast.success('Supply request successfully created!');
      }
    } catch (error) {
      toast.error(error.message || 'Unknown error');
    }
  };

  const getFileFromRequest = async () => {
    if (data?.request?.documentData) {
      const result = await getFileFromString(data?.request?.documentData, data?.request?.documentName || 'document.pdf');
      if (data.action === 'view') {
        setCurrentFile(result);
      } else if (data.action === 'sign') {
        setNewFile(result);
      }
    }
  }

  useEffect(() => {
    setAction(data.action);
    getFileFromRequest();
    if (data.action === 'sign') {
      setCurrentStep(3);
    }
  }, [data]);

  return {
    request,
    currentStep,
    currentUser,
    currentFile,
    newFile,
    action,
    isSignatureOpen,
    setCurrentStep,
    setIsSignatureOpen,
    handleSigning,
    handleSelect,
    handleStep,
  }
};
