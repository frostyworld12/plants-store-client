import { useEffect, useState } from "react";
import { getUsers, upsertUser, deleteUser } from "../services/usersService";
import toast from 'react-hot-toast';

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [isModalUserOpen, setIsModalUserOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const [isInsertMode, setIsInsertMode] = useState(false);

  const [userData, setUserData] = useState({});

  const handleRetrieveUsers = async () => {
    setIsLoading(true);
    const result = await retrieveUsers();
    setUsers(result);
    setIsLoading(false);
  };

  const handleSaveUser = async (userData, isInsert) => {
    await saveUser(userData, isInsert);
    await handleRetrieveUsers();
  };

  const handleRemoveUser = async() => {
    await removeUser(userData?.userId);
    await handleRetrieveUsers();
  }

  const handleSetUpUserData = (data) => {
    setUserData(data);
  };

  const handleUserDataChange = (e, input) => {
    const value = e?.target?.value;
    setUserData(state => ({...state, [input]: value}));
  };

  const handleOpenModal = (state, isInsert) => {
    setIsModalUserOpen(state);
    setIsInsertMode(isInsert);

    if (!state) {
      handleSetUpUserData({});
    }
  };

  const handleConfirmOpen = (state, userId) => {
    setIsConfirmOpen(state);
    setUserData({userId: userId});
  }

  useEffect(() => {
    handleRetrieveUsers();
  }, []);

  return {
    isLoading,
    users,
    isModalUserOpen,
    isConfirmOpen,
    isInsertMode,
    userData,
    handleSaveUser,
    handleRemoveUser,
    handleSetUpUserData,
    handleUserDataChange,
    handleOpenModal,
    handleConfirmOpen
  };
};

const retrieveUsers = async() => {
  console.log('retrieveUsers');
  let result = [];
  try {
    result = await getUsers();
  } catch (error) {
    toast.error(error.message || 'Unknown error');
  }

  return result;
};

const saveUser = async(userData, isInsert) => {
  console.log('saveUser', userData)
  try {
    const result = await upsertUser(userData, isInsert);
    if (result === 'Success') {
      toast.success(`Employee was successfully ${isInsert ? 'created' : 'updated'}!`);
    }
  } catch (error) {
    console.error(error);
    toast.error(error.message || 'Unknown error');
  }
};

const removeUser = async(userId) => {
  if (!userId) {
    return;
  }

  try {
    const result = await deleteUser(userId);
    if (result === 'Success') {
      toast.success(`Employee was successfully deleted!`);
    }
  } catch (error) {
    console.error(error);
    toast.error(error.message || 'Unknown error');
  }
};

