import PropTypes from "prop-types";

const Input = ({ label = '', type = 'text', onChange = () => {}, value = '', placeholder = '', isRequired = false }) => {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-zinc-900">{label}</label>
      <input
        type={type}
        className="bg-zinc-50 border-2 border-zinc-300 text-zinc-900 transition-all duration-300 text-sm rounded-lg focus:ring-zinc-500 focus:border-zinc-500 block w-full p-2.5"
        placeholder={placeholder}
        required={isRequired}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  isRequired: PropTypes.bool
};

export default Input;