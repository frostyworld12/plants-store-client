const typePerClass = {
  filled: 'bg-zinc-800 text-zinc-50 rounded-lg hover:bg-zinc-700',
  outline: 'text-zinc-500 border-2 border-zinc-100 rounded-lg hover:border-zinc-200 hover:text-zinc-600'
};

const Button = ({ type = '', title = '', buttonType = '', form = '', isDisabled = false, onClick = () => { }, className }) => {
  return (
    <button
      type={buttonType}
      form={form}
      className={"px-3 py-1.5 transition-all duration-300 font-semibold " + typePerClass[type] + " " + className}
      onClick={(e) => onClick(e)}
      disabled={isDisabled}
    >
      {title}
    </button>
  );
}

export default Button;