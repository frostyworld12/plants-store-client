import PropTypes from "prop-types";
import Icon from "../../../../../components/Icon/Icon";

const MenuItem = ({ itemName, iconName, isSelected, onClickItem }) => {
  const handleItemClick = () => {
    onClickItem(itemName);
  }

  return (
    <li onClick={() => handleItemClick()} className={
        "rounded-lg px-3 py-3 cursor-pointer transition-all duration-300 " +
        (isSelected ? "bg-zinc-900" : "")
      }
    >
      <div className="flex items-center gap-5">
        <Icon iconName={iconName} iconClassName={"w-6 " + (isSelected ? "text-zinc-50" : "text-zinc-800")}/>
        <span className={"font-semibold font " + (isSelected ? "text-zinc-50" : "text-zinc-800")}>
          { itemName }
        </span>
      </div>
    </li>
  );
}

MenuItem.propTypes = {
  itemName: PropTypes.string,
  iconName: PropTypes.string,
  isSelected: PropTypes.bool,
  onClickItem: PropTypes.func
};

export default MenuItem;