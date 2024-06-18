import { useRef } from 'react';

const Dropzone = ({ onChange = () => { } }) => {
  const fileInput = useRef(null);

  const handleChange = (e) => {
    const uploadedFile = e.target?.files[0];
    onChange(uploadedFile);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.items) {
      const item = e.dataTransfer.items[0];
      if (item.kind === 'file') {
        const file = item.getAsFile();
        if (file?.type === 'application/pdf') {
          onChange(file);
        }
      }
    }
  };

  const handleClick = () => {
    fileInput.current.click();
  };

  return <div
    className="border border-zinc-200 border-dashed rounded-lg p-3 cursor-pointer"
    onClick={handleClick}
    onDragOver={(e) => e.preventDefault()}
    onDrop={handleDrop}
  >
    <div className="flex items-center justify-center">
      <div className="font-semibold text-sm text-zinc-500">
        Select or drop file
      </div>
    </div>

    <input
      className="hidden"
      type="file"
      ref={fileInput}
      onChange={handleChange}
      accept="application/pdf"
    />
  </div>
};

export default Dropzone;