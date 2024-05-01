import Icon from "../Icon/Icon";

const Input = ({ label = '', type = 'text', classType='bordered', onChange = () => {}, onKeyUp = () => {}, value = '', placeholder = '', isRequired = false, iconName = '' }) => {
  const classPerType = {
    bordered: "bg-zinc-50 border-2 border-zinc-300 text-zinc-900 focus:ring-zinc-500 focus:border-zinc-500",
    bare: "bg-zinc-50 text-zinc-900 hover:bg-zinc-100"
  }
  return (
    <div>
      {
        label && <label className="block mb-1 text-sm font-medium text-zinc-900">{label}</label>
      }
      <div className="relative">
          {
            iconName &&
              <div className="absolute h-full flex items-center ml-2">
                <Icon iconName={iconName} iconClassName="w-5 text-zinc-400" type="solid"/>
              </div>
          }
        <input
          type={type}
          className={(iconName ? "ps-10" : "") + " font-medium  transition-all duration-300 text-sm rounded-lg block w-full p-2.5 " + classPerType[classType]}
          placeholder={placeholder}
          required={isRequired}
          value={value}
          onChange={onChange}
          onKeyUp={onKeyUp}
        />
      </div>
    </div>
  );
}

export default Input;