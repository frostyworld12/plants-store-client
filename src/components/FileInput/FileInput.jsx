import { useEffect, useRef, useState } from 'react';
import Button from "../Button/Button";
import Icon from "../Icon/Icon";

const FileInput = ({ label = '', onChange = () => { }, value = '', isRequired = false, isReadOnly = false }) => {
  const fileInput = useRef(null);
  const [currentValue, setCurrentValue] = useState('');

  const handleUploadClick = () => {
    fileInput.current.click();
  };

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(uploadedFile);
      reader.onload = () => {
        onChange(reader.result);
        setCurrentValue(reader.result);
      };
      reader.onerror = (error) => {
        console.log('Error: ', error);
      };
    }
  }

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  return (
    <div className="flex w-full">
      <label className="block mb-2 text-sm font-medium text-zinc-900">{label}</label>
      <div className="flex flex-col gap-4 items-center w-full">
        <div className="overflow-hidden shadow-lg rounded-full h-[80px] w-[80px] flex justify-center items-center">
          {
            currentValue
              ? <img className="object-cover h-[80px] w-[80px]" src={currentValue} />
              : <Icon iconName="CameraIcon" iconClassName="w-12 text-zinc-300" type="solid" />
          }
        </div>
        {
          !isReadOnly && <div>
            <Button
              title="Choose file"
              type="outline"
              onClick={handleUploadClick}
            ></Button>
          </div>
        }
      </div>
      <input
        className="hidden"
        type="file"
        ref={fileInput}
        onChange={handleFileUpload}
        accept="image/png, image/jpeg"
        required={isRequired}
      />
    </div>
  );
}

export default FileInput;