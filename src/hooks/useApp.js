import { useEffect, useState } from "react";
import * as userService from "../services/userService";

export const useApp = () => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const userData = userService.getUserData();
    setCurrentUser(userData);
  }, []);

  return {
    currentUser
  };
};