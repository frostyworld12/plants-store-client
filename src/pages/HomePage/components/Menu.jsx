import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getUserData } from "../../../services/userService";

import Icon from "../../../components/Icon/Icon";

const USER_TYPE_MENU = {
  Supplier: [
    'Products',
    'Supplies'
  ],
  Employee: [
    'Products',
    'Supplies',
    'Suppliers',
  ]
};

const MENU_ITEMS = [
  { name: 'Products' , iconName: 'CubeIcon'               , isSelected: false, isAllowed: false, link: 'products'  },
  { name: 'Suppliers', iconName: 'BuildingStorefrontIcon' , isSelected: false, isAllowed: false, link: 'suppliers' },
  { name: 'Supplies' , iconName: 'ArchiveBoxArrowDownIcon', isSelected: false, isAllowed: false, link: 'supplies'  },
  { name: 'Inventory', iconName: 'ArchiveBoxIcon'         , isSelected: false, isAllowed: false, link: 'inventory' },
  { name: 'Employees', iconName: 'UsersIcon'              , isSelected: false, isAllowed: false, link: 'employees' },
];

const Menu = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [menuItems, setMenuItems] = useState([]);

  const getCurrentPath = () => {
    const pathParts = location.pathname.split('/');
    return pathParts[pathParts.length > 3 ? pathParts.length - 2 : pathParts.length - 1];
  };

  const setUpSelectedItem = (selectedItem, items) => {
    return items.map(item => {
      item.isSelected = item === selectedItem;
      return item;
    });
  };

  const handleItemClick = (selectedItem) => {
    navigate('/home/' + selectedItem.link);
  };

  useEffect(() => {
    const userData = getUserData() || {};
    console.log('userData', userData);
    const allowedMenu = MENU_ITEMS.map(item => ({...item, isAllowed: USER_TYPE_MENU[userData.user?.role]?.includes(item.name)}));
    console.log('allowedMenu', allowedMenu);

    const currentItem = allowedMenu.find(item => item.link === getCurrentPath());
    setMenuItems(setUpSelectedItem(currentItem, allowedMenu));
  }, [location]);

  return (
    <div className="flex flex-col gap-">
      {
        menuItems && menuItems.map((item, i) => {
          return item.isAllowed && <ul key={i}>
            <li onClick={() => handleItemClick(item)} className={
              "rounded-lg px-3 py-3 cursor-pointer transition-all duration-300 " +
              (item.isSelected ? "bg-zinc-800" : "")
            }
            >
              <div className="flex items-center gap-5">
                <Icon iconName={item.iconName} iconClassName={"w-6 " + (item.isSelected ? "text-zinc-50" : "text-zinc-800")} />
                <span className={"font-semibold font " + (item.isSelected ? "text-zinc-50" : "text-zinc-800")}>
                  {item.name}
                </span>
              </div>
            </li>
          </ul>
        })
      }
    </div>
  );
}

export default Menu;