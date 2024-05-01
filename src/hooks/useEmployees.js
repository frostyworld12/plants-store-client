import { useEffect, useState } from "react";
import * as employeesService from "../services/employeesService";
import toast from 'react-hot-toast';

export const useEmployees = (query, isNeedUpdate) => {
  const [isLoading, setIsLoading] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [currentEmployee, setCurrentEmployee] = useState(null);

  const pageSize = 12;
  const [offset, setOffset] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const processEmployees = async() => {
    setIsLoading(true);
    const result = await retrieveEmployees(pageSize, offset, query);
    setIsLoading(false);
    setEmployees(result?.employees || []);
    setTotalCount(result?.count || 0);
  };

  useEffect(() => {
    if (isNeedUpdate) {
      processEmployees();
    }
  }, [offset, query, isNeedUpdate]);

  return {
    isLoading,
    employees,
    currentEmployee,
    setCurrentEmployee,
    processEmployees,
    pageSize,
    setOffset,
    totalCount
  }
};

export const useEmployeesProcess = (data) => {
  const [employeeData, setEmployeeData] = useState({});
  const [action, setAction] = useState('');

  const handleEmployeeDataChange = (value, field) => {
    setEmployeeData(data => ({...data, [field]: value}));
  };

  const handleSaveEmployee = async () => {
    await saveEmployee(employeeData);
  };

  const handleRemoveEmployee = async () => {
    await removeEmployee(employeeData);
  };

  useEffect(() => {
    console.log(data);
    setEmployeeData(data?.employee || {});
    setAction(data?.action || '');
  }, [data]);

  return {
    action,
    employeeData,
    handleEmployeeDataChange,
    handleSaveEmployee,
    handleRemoveEmployee
  };
};

const retrieveEmployees = async(limit, offset, query) => {
  try {
    return await employeesService.retrieveEmployees(limit, offset, query);
  } catch (error) {
    toast.error(error.message || 'Unknown error');
  }
};

const saveEmployee = async(data) => {
  try {
    await employeesService.saveEmployee(data);
    toast.success('Employee successfully saved.');
  } catch (error) {
    toast.error(error.message || 'Unknown error');
  }
}

const removeEmployee = async(data) => {
  try {
    await employeesService.deleteEmployee(data?.userId);
    toast.success('Employee successfully removed.');
  } catch (error) {
    toast.error(error.message || 'Unknown error');
  }
}

