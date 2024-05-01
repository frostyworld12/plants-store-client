import * as IconsOutline from "@heroicons/react/24/outline"
import * as IconsSolid from "@heroicons/react/16/solid"

const Icon = ({ iconName = '', iconClassName = '', type = 'outline' }) => {
  const {...icons} = type === 'outline' ? IconsOutline : IconsSolid;

  const Icon = icons[iconName];
  return (
    iconName && <Icon className={iconClassName} />
  );
}

export default Icon;