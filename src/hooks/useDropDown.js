import { useState } from "react";

export const useDropDown = () => {
  const [isDropDownHidden, setIsDropDownHidden] = useState(true);

  const handleOpenDropDown = (state) => {
    setIsDropDownHidden(state)
  }

  return {
    isDropDownHidden,
    handleOpenDropDown
  };
}