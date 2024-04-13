import PropTypes from "prop-types";

const typePerClass = {
  filled: 'bg-zinc-600 text-zinc-50 rounded-lg px-7 py-[0.4rem] hover:bg-zinc-700',
  outline: 'text-zinc-600 border-[1px] border-zinc-200 rounded-lg px-5 hover:border-zinc-300 hover:text-zinc-800'
};

const Button = ({ type = '', title = '', buttonType = '', form = '', onClick = () => {} }) => {
  return (
    <button
      type={buttonType}
      form={form}
      className={"p-1 transition-all duration-300 " + typePerClass[type]}
      onClick={(e) => onClick(e)}
    >
      { title }
    </button>
  );
}


Button.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string,
  buttonType: PropTypes.string,
  form: PropTypes.string,
  onClick: PropTypes.func
};

export default Button;