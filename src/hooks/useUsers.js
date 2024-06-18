import * as userService from "../services/userService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

export const useRegisterSupplierUser = () => {
  const [supplierData, setSupplierData] = useState({});
  const navigate = useNavigate();

  const handleSupplierDataChange = (value, field) => {
    setSupplierData(data => ({...data, [field]: value}));
  };

  const handleSaveSupplier = async () => {
    try {
      await userService.createSupplierUser(supplierData);
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

export const useLoginUser = () => {
  const [userData, setUserData] = useState();
  const navigate = useNavigate();

  const handleUserDataChange = (value, field) => {
    setUserData(data => ({...data, [field]: value}));
  };

  const handleLoginUser = async() => {
    try {
      await userService.getUser(userData);
      navigate('/home');
    } catch (error) {
      toast.error(error.message || 'Unknown error');
    }
  };

  return {
    userData,
    handleUserDataChange,
    handleLoginUser
  }
};

export const useCurrentUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({});
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  const getUserData = async (currentUser) => {
    setIsLoading(true);
    try {
      const result = await userService.getUserById(currentUser?.user?.id) || {};
      const userData = {
        ...(result.supplier || result.employee),
        user: result.user
      };
      setUserData(userData);
    } catch (error) {
      console.log(error.message);
    }
    setIsLoading(false);
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
    isLoading,
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