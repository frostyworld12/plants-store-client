import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import MenuItem from "./MenuItem/MenuItem";

const menuItems = [
  { name: 'Purchases', iconName: 'CreditCardIcon'         , isSelected: false, link: '' },
  { name: 'Products' , iconName: 'CubeIcon'               , isSelected: false, link: '' },
  { name: 'Customers', iconName: 'BriefcaseIcon'          , isSelected: false, link: '/customers' },
  { name: 'Supliers' , iconName: 'BuildingStorefrontIcon' , isSelected: false, link: '/suppliers' },
  { name: 'Suplies'  , iconName: 'ArchiveBoxArrowDownIcon', isSelected: false, link: '/supplies'  },
  { name: 'Inventory', iconName: 'ArchiveBoxIcon'         , isSelected: false, link: '' },
  { name: 'Employees', iconName: 'UsersIcon'              , isSelected: false, link: '/employees' },
];

const MenuColumn = () => {
  const navigate = useNavigate()
  const location = useLocation();
  const currentItem = menuItems.find(item => item.link === location.pathname);

  const [selectedItem, setSelectedItem] = useState(currentItem?.name);

  const handleClickItem = (itemName) => {
    const currentItem = menuItems.find(item => item.name === itemName);
    if (currentItem) {
      navigate(currentItem.link);
      setSelectedItem(itemName);
    }
  };

  return (
    <div className="flex flex-col gap-">
      {
        menuItems.map((item, i) => {
          return <ul key={i}>
            <MenuItem
              itemName={item.name}
              isSelected={selectedItem === item.name}
              iconName={item.iconName}
              onClickItem={handleClickItem}
            />
          </ul>
        })
      }
    </div>
  );
}

export default MenuColumn;