import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const LOGIN_STATES = [
  { label: 'Employee', value: 'employee', selected: true },
  { label: 'Supplier', value: 'supplier', selected: false },
];

export const useLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [loginStates, setLoginStates] = useState([]);
  const [currentState, setCurrentState] = useState('Employee');

  const handleChangeLoginState = (selectedState) => {
    const currentStates = loginStates.map(state => ({ ...state, selected: state.value === selectedState.value }));

    setCurrentState(selectedState.label);
    setLoginStates(currentStates);
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  useEffect(() => {
    const pathParts = location.pathname.split('/');
    setLoginStates(LOGIN_STATES);

    if (pathParts.length > 2) {
      const currentStates = LOGIN_STATES.map((state) => ({...state, selected: state.value === pathParts[pathParts.length - 1]}));
      setLoginStates(currentStates);
    }
  }, []);

  return {
    currentState,
    loginStates,
    handleChangeLoginState,
    handleRegisterClick
  };
};