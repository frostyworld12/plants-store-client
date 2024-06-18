import Icon from "../Icon/Icon";

const Input = ({
  label = '',
  iconName = '',
  classType = 'bordered',
  type = 'text',
  value = '',
  placeholder = '',
  isRequired = false,
  isReadOnly = false,
  step = 'any',
  min = 0,
  onChange = () => { },
  onKeyUp = () => { },
  onClick = () => { }
}) => {
  const classPerType = {
    bordered: "border border-zinc-200 text-zinc-800 focus:ring-zinc-500 focus:border-zinc-300",
    bare: "text-zinc-900 hover:bg-zinc-100 bg-zinc-50"
  }
  return (
    <div>
      {
        label && <label className="block mb-1 text-sm font-medium text-zinc-600">{label}</label>
      }
      <div className="relative">
        {
          iconName &&
          <div className="absolute h-full flex items-center ml-2">
            <Icon iconName={iconName} iconClassName="w-5 text-zinc-400" type="solid" />
          </div>
        }
        <input
          type={type}
          className={(iconName ? "ps-10" : "") + " font-medium transition-all duration-300 text-sm rounded-lg block w-full px-3 py-2 " + classPerType[classType]}
          placeholder={placeholder}
          min={min}
          step={step}
          required={isRequired}
          readOnly={isReadOnly}
          value={value}
          onChange={onChange}
          onKeyUp={onKeyUp}
          onClick={onClick}
        />
      </div>
    </div>
  );
}

export default Input;