export const api = 'http://localhost:8080/';

export const getEmployees = api + 'employees/getEmployees';
export const saveEmployee = api + 'employees/saveEmployee';
export const deleteEmployee = api + 'employees/deleteEmployee';
export const getEmployee = api + 'employees/getEmployee';

export const getSuppliers = api + 'suppliers/getSuppliers';
export const getAllSuppliers = api + 'suppliers/getAllSuppliers';
export const saveSupplier = api + 'suppliers/saveSupplier';
export const deleteSupplier = api + 'suppliers/deleteSupplier';
export const getSupplier = api + 'suppliers/getSupplier';
export const createSupplierUser = api + 'users/createSupplierUser';

export const getUser = api + 'users/getUser';
export const getUserById = api + 'users/getUserById';

export const getProducts = api + 'products/getProducts';
export const saveProduct = api + 'products/saveProduct';
export const deleteProduct = api + 'products/deleteProduct';
export const getProductsByIds = api + 'products/getProductsByIds';

export const saveSupplyRequest = api + 'supplyrequest/saveSupplyRequest';
export const saveSupplierRequest = api + 'supplyrequest/saveSupplierSupplyRequest';
export const getSupplyRequests = api + 'supplyrequest/getSupplyRequests';
export const getSupplyRequestById = api + 'supplyrequest/getRequestById';
export const signSupplyRequest = api + 'supplyrequest/signSupplyRequest';
export const getSupplyRequestsForSupplier = api + 'supplyrequest/getSupplyRequestsForSupplier'

export const getNotifications = api + 'notifications/getNotifications';
export const readNotification = api + 'notifications/readNotification';

export const fetchRoutes = {
  suppliers: getSuppliers,
  products: getProducts,
  requests: getSupplyRequestsForSupplier
};
