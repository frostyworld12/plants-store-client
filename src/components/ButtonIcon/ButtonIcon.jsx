import Icon from "../Icon/Icon";

const typePerClass = {
  bare: 'text-zinc-900 hover:bg-zinc-200 rounded-lg w-8 h-8 p-1',
  outline: 'text-zinc-900 border border-zinc-200 hover:bg-zinc-50 active:bg-zinc-900 active:text-zinc-50 rounded-lg w-8 h-8 p-1 bg-white',
  bareRounded: 'text-zinc-900 hover:bg-zinc-50 active:text-zinc-50 rounded-full w-4 h-4'
};

const typePerClassIcon = {
  bare: 'text-zinc-500 group-hover:text-zinc-600',
  outline: 'text-zinc-500 group-active:text-zinc-50',
  bareRounded: 'text-zinc-500 group-hover:text-zinc-600'
};

const ButtonIcon = ({ type = 'bare', iconName = '', title = '', onClick = () => {} }) => {
  return (
    <button type="button" className={"transition-all duration-300 group flex items-center justify-center " + typePerClass[type]} title={title} onClick={(e) => onClick(e)}>
      <Icon iconName={iconName} iconClassName={"transition-all duration-300 " + typePerClassIcon[type]} type="solid" />
    </button>
  );
}

export default ButtonIcon;