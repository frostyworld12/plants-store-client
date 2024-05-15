const Textarea = ({ label = '', type = 'text', classType='bordered', onChange = () => {}, value = '', rows = 5, placeholder = '', isRequired = false }) => {
  const classPerType = {
    bordered: "bg-zinc-50 border-2 border-zinc-300 text-zinc-900 focus:ring-zinc-500 focus:border-zinc-500",
    bare: "bg-zinc-50 text-zinc-900 hover:bg-zinc-100"
  }
  return (
    <div>
      {
        label && <label className="block mb-1 text-sm font-medium text-zinc-900">{label}</label>
      }
      <div>
        <textarea
          type={type}
          className={"font-medium  transition-all duration-300 text-sm rounded-lg block w-full p-2.5 resize-none " + classPerType[classType]}
          placeholder={placeholder}
          required={isRequired}
          value={value}
          onChange={onChange}
          rows={rows}
          spellCheck
        />
      </div>
    </div>
  );
}

export default Textarea;