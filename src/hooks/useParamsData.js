import { useParams } from 'react-router-dom';
import { useEffect } from "react";

export const useParamsData = (onSelect = () => { }, param, isLoaded) => {
  const params = useParams();

  useEffect(() => {
    if (params[param]) {
      onSelect(params[param]);
    }
  }, [params, isLoaded]);
};