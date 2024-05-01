import Icon from "../Icon/Icon";

const typePerClass = {
  bare: 'hover:bg-zinc-200',
  outline: 'text-zinc-900 border border-zinc-200 hover:bg-zinc-50 active:bg-zinc-900 active:text-zinc-50'
};

const typePerClassIcon = {
  bare: 'text-zinc-400 group-hover:text-zinc-500',
  outline: 'text-zinc-500 group-active:text-zinc-50'
};

const ButtonIcon = ({ type = 'bare', iconName = '', title = '', onClick }) => {
  return (
    <button className={"w-8 h-8 p-1 transition-all duration-300 rounded-lg group " + typePerClass[type]} title={title} onClick={(e) => onClick(e)}>
      <Icon iconName={iconName} iconClassName={"transition-all duration-300 " + typePerClassIcon[type]} type="solid" />
    </button>
  );
}

export default ButtonIcon;