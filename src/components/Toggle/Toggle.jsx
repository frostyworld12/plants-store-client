import { useState } from 'react';

const Toggle = ({ label = '', value = false, onChange = () => { } }) => {
  const [isSelected, setIsSelected] = useState(value);

  const handleChange = () => {
    setIsSelected(!isSelected);
    onChange(!isSelected);
  };

  return (
    <div className='flex gap-3 items-center'>
      <div
        className={(isSelected ? 'bg-zinc-800' : 'bg-zinc-100') + ' border border-zinc-200 w-[50px] p-[2px] rounded-full cursor-pointer transition-all duration-300'}
        onClick={handleChange}
      >
        <div className={(isSelected ? 'border-zinc-700 translate-x-6' : '') + ' bg-white border rounded-full w-[20px] h-[20px] transition-all duration-300'}></div>
      </div>
      <span className='text-sm font-semibold text-zinc-800'>
        {label}
      </span>
    </div>
  );
};

export default Toggle;