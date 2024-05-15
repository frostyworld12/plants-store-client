import * as userService from "../services/userService";
import * as suppliersService from "../services/suppliersService";
import * as employeesService from "../services/employeesService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

export const useSupplierUser = () => {
  const [supplierData, setSupplierData] = useState({});
  const navigate = useNavigate();

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
    try {
      await userService.createSupplierUser(data);
      navigate('/home');
    } catch (error) {
      toast.error(error.message || 'Unknown error');
    }
  };

  return {
    supplierData,
    handleSupplierDataChange,
    handleSaveSupplier
  }
};

export const useUser = (userType) => {
  const [userData, setUserData] = useState();
  const navigate = useNavigate();

  const handleUserDataChange = (value, field) => {
    setUserData(data => ({...data, [field]: value}));
  };

  const handleGetUser = async() => {
    const data = {
      username: userData.username,
      password: userData.password,
      userType: userType
    };

    try {
      await userService.getUser(data);
      navigate('/home');
    } catch (error) {
      toast.error(error.message || 'Unknown error');
    }
  };

  return {
    userData,
    handleUserDataChange,
    handleGetUser
  }
};

export const useCurrentUser = () => {
  const [userData, setUserData] = useState({});
  const [userDataModal, setUserDataModal] = useState({});
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  const getUserData = async (currentUser) => {
    try {
      let result = {};
      if (currentUser?.user?.role === 'Supplier') {
        result = await suppliersService.getSupplier(currentUser?.id);
        result.role = 'Supplier';
      } else if (currentUser?.user?.role === 'Employee') {
        result = await employeesService.getEmployee(currentUser?.id);
        result.role = 'Employee';
        setUserDataModal({
          employee: {
            id: userData.id,
            image: userData.image,
            firstName: userData.firstName,
            lastName: userData.lastName
          },
          action: 'edit'
        });
      }
      setUserData(result);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleUserModal = (state) => {
    setIsUserModalOpen(state);
  };

  useEffect(() => {
    const currentUser = userService.getUserData();
    getUserData(currentUser);
  }, [isUserModalOpen]);

  return {
    userData,
    userDataModal,
    isUserModalOpen,
    handleUserModal
  };
};

export const useLogoutUser = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    userService.removeUserData();
    navigate('/login');
  };

  return {
    handleLogout
  };
};