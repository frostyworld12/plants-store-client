const Textarea = ({
  label = '',
  type = 'text',
  classType = 'bordered',
  onChange = () => { },
  value = '',
  rows = 5,
  placeholder = '',
  isRequired = false,
  isReadonly = false
}) => {
  const classPerType = {
    bordered: 'border border-zinc-200 text-zinc-800 focus:ring-zinc-500 focus:border-zinc-300',
    bare: 'text-zinc-900 hover:bg-zinc-100 bg-zinc-50'
  }
  return (
    <div>
      {
        label && <label className='block mb-1 text-sm font-medium text-zinc-600'>{label}</label>
      }
      <div>
        <textarea
          type={type}
          className={'font-medium  transition-all duration-300 text-sm rounded-lg block w-full p-2.5 resize-none ' + classPerType[classType]}
          placeholder={placeholder}
          required={isRequired}
          readOnly={isReadonly}
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